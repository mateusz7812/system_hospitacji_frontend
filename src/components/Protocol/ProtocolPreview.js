import React from 'react';
import styled from 'styled-components';

const ProtocolContainer = styled.div`

`;

const HeaderContainer = styled.div`
    width: 100%;
    height: 300px;
`;

const Image = styled.img`
    float: left;
    width: 15%;
`;

const HeaderTitle = styled.div`
    width: 70%;
    height: 300px;
    float: left;
    text-align: center;
    font-size: 22px;
    font-weight: bolder;
    line-height: 25px;
    padding-top: 70px;
`;

const HeaderDate = styled.div`
    width: 15%;
    float: left;
    height: 200px;
    display: flex;
    align-items: end;
    font-size: 15px;
`;

const ProtocolHeader = ({date}) =>{
    if(date == "nieustalona"){
        date = "data " + date
    }

    return (
        <HeaderContainer>
            <Image src="logo-pwr.png"/>
            <HeaderTitle>Wydziałowy/Studyjny/Filialny<br/>System Zapewniania Jakości Kształcenia<br/><br/>PROTOKÓŁ Z HOSPITACJI</HeaderTitle>
            <HeaderDate>Wrocław, {date}</HeaderDate>
        </HeaderContainer>
    )
}

const Line = styled.div`
    margin-left: 20px;
    width: 100%;
`;

const ComissionMember = ({member}) => (
    <Line>{member.first_name} {member.last_name}, członek komisji hospitującej</Line>
)

const Container = styled.div`
    width: 100%;
    text-align: left;
    margin-bottom: 20px;
`;

const SectionHeader = styled.div`
    font-weight: bolder;
    font-size: 25px;
    margin-bottom: 10px;
`;

const ProtocolHospitalizationCommittees = ({hospitals}) =>{
    return(
        <Container>
            <SectionHeader>Zespół hospitujący:</SectionHeader>
            {
                hospitals.map((m) => 
                <ComissionMember member={m}/>)
            }
        </Container>
    )
}

const ProtocolIntroductoryInformation = ({ hospitalized, course, group }) => {
    return(
        <Container>
            <SectionHeader>1. Informacje wstępne</SectionHeader>
            <Line>1.1&emsp;Prowadzący zajęcia/Jednostka organizacyjna: {hospitalized.first_name} {hospitalized.last_name}</Line>
            <Line>1.2&emsp;Nazwa kursu/kierunek studiów: {course.name}</Line>
            <Line>1.3&emsp;Kod kursu: {course.code} Forma dydaktyczna: {course.form}</Line>
            <Line>1.4&emsp;Stopień i forma studiów: {course.degree} {group.form} Semestr {course.semester}</Line>
            <Line>1.5&emsp;Miejsce i termin zajęć (sala, budynek, dzień tygodnia, godziny): {group.building} {group.room} {group.week_day} {group.hour}</Line>
        </Container>
    )
}

const Field = ({ className, field, answer, editing }) => {
    let name = field.substr(1, field.search(':') - 1);
    let type = field.substr(field.search(':') + 1, field.length - field.search(':') - 2);
    return(
        <span className={className}>{
            editing 
            ? 
                type == "int" ? <input type='number' value={answer[name]}/>
                : type == "text_area" ? <textarea>{answer[name]}</textarea>
                : type.includes('/') ? type.split('/').map(m => <><input type='radio' id={name+m} name={name} value={m} defaultChecked={answer[name] == m}/><label for={name+m}>{m}</label></>)
                : "type not found"
            : typeof answer[name] ==='undefined' ? '...' : answer[name]
        }</span>
    )
}

const MainField = styled(Field)`
    float: right;
`;

const QuestionLine = ({ question, answer, index, editing }) => {
    let regex = /\{[a-z|:|\/|_]*\}/gm;
    let fields = question.match(regex)
    let mainField = fields.shift()
    question = question.replace(mainField, '')
    let questionArray = []
    while(fields.length > 0){
        let index = question.search(fields[0])
        if(index == 0){
            question = question.replace(fields[0], '')
            questionArray.push(<Field answer={answer} field={fields.shift()} editing={editing}/>)
        }else{
            let substr = question.substr(0, index)
            questionArray.push(substr)
            question = question.replace(substr, '')
        }
    }
    questionArray.push(question)
    return(
        <Line>2.{index}&emsp;{questionArray}<MainField answer={answer} field={mainField} editing={editing}/></Line>
    )
}

const ProtocolFormalAssessment = ({ questions, answers, editing }) => {
    return(
        <Container>
            <SectionHeader>2. Ocena formalna</SectionHeader>
            {(() => {
                let lines = [];
                for(let i = 0; i < questions.length; i++){
                    let question = questions[i];
                    let answer = answers.find(a => a.question_id == question.id) || {"text": JSON.stringify({})}
                    lines.push(<QuestionLine question={question.text} answer={JSON.parse(answer.text)} index={i+1} editing={editing}/>)
                }
                return lines;
            })()}
        </Container>
    )
}

export const ProtocolPreview = ({protocol, details, questions, answers, editing}) => {
    return(
        <ProtocolContainer>
            <ProtocolHeader date={protocol.creation_date}/>
            { typeof details !== "undefined" && typeof answers !== "undefined" &&
                <>
                    <ProtocolHospitalizationCommittees hospitals={details.hospitals}/>
                    <ProtocolIntroductoryInformation hospitalized={details.hospitalized} course={details.course} group={details.group}/>
                    <ProtocolFormalAssessment questions={questions} answers={answers} editing={editing}/>
                </>
            }
        </ProtocolContainer>
    )
}
