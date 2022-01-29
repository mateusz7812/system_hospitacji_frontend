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
                <ComissionMember key={m.first_name + m.last_name} member={m}/>)
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

const Field = ({ className, question_id, field, answer, editing, onAnswerEdit }) => {
    let name = field.substr(1, field.search(':') - 1);
    let type = field.substr(field.search(':') + 1, field.length - field.search(':') - 2);
    return(
        <span className={className}>{
            editing 
            ? 
                type == "int" ? <input type='number' defaultValue={answer[name]} onChange={(e) => onAnswerEdit(question_id, name, e.currentTarget.value)}/>
                : type == "text_area" ? <textarea value={answer[name]}  onChange={(e) => onAnswerEdit(question_id, name, e.currentTarget.value)}></textarea>
                : type.includes('/') ? type.split('/').map(m => <><input type='radio' onClick={(e) => onAnswerEdit(question_id, name, e.currentTarget.value)} id={name+m} name={name} value={m} defaultChecked={answer[name] == m}/><label for={name+m}>{m}</label></>)
                : "type not found"
            : typeof answer[name] ==='undefined' ? '...' : answer[name]
        }</span>
    )
}

const MainField = styled(Field)`
    float: right;
`;

const QuestionLine = ({ question_id, question, answer, index, editing, onAnswerEdit }) => {
    let regex = /\{[a-z|:|\/|_]*\}/gm;
    let fields = question.match(regex)
    let mainField = fields.shift()
    question = question.replace(mainField, '')
    let questionArray = []
    while(fields.length > 0){
        let index = question.search(fields[0])
        if(index == 0){
            question = question.replace(fields[0], '')
            questionArray.push(<Field key={question+question_id} question_id={question_id} answer={answer} field={fields.shift()} editing={editing} onAnswerEdit={onAnswerEdit}/>)
        }else{
            let substr = question.substr(0, index)
            questionArray.push(substr)
            question = question.replace(substr, '')
        }
    }
    questionArray.push(question)
    return(
        <Line>2.{index}&emsp;{questionArray}<MainField key={question+question_id} question_id={question_id} answer={answer} field={mainField} editing={editing} onAnswerEdit={onAnswerEdit}/></Line>
    )
}

const ProtocolFormalAssessment = ({ questions, answers, editing, onAnswerEdit }) => {
    return(
        <Container>
            <SectionHeader>2. Ocena formalna</SectionHeader>
            {(() => {
                let lines = [];
                for(let i = 0; i < questions.length; i++){
                    let question = questions[i];
                    let answer = answers.find(a => a.question_id == question.id) || {"text": JSON.stringify({})}
                    lines.push(<QuestionLine key={question.id} question_id={question.id} question={question.text} answer={JSON.parse(answer.text)} index={i+1} editing={editing} onAnswerEdit={onAnswerEdit}/>)
                }
                return lines;
            })()}
        </Container>
    )
}

export const ProtocolPreview = ({ protocol, details, questions, answers, editing, onAnswerEdit }) => {
    return(
        <ProtocolContainer>
            <ProtocolHeader date={protocol.creation_date}/>
                { typeof hospitals !== "undefined" &&
                    <ProtocolHospitalizationCommittees hospitals={details.hospitals}/>
                }      
                { typeof details !== "undefined" && typeof answers !== "undefined" && 
                    <>
                        <ProtocolIntroductoryInformation hospitalized={details.hospitalized} course={details.course} group={details.group}/>
                        <ProtocolFormalAssessment questions={questions} answers={answers} editing={editing} onAnswerEdit={onAnswerEdit}/>
                    </>
                }
        </ProtocolContainer>
    )
}
