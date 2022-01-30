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

    & input[type="number"], & textarea {
        background-color : #555;
        border-radius: 5px;
    }

    & textarea {
        margin: 5px;
    }

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

const CheckError = styled.div`
    color: red;
    display: inline;
    font-weight: bolder;
`;

const ButtonsGroup = styled.ul`
    display: inline;
    list-style-type: none;
    padding: 0;
    width: 280px;
 
    & li {
        float: left;
        margin: 0 5px 0 0;
        width: 90px;
        height: 26px;
        position: relative;
        text-align: center;
    }

    & label,
    & input {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 3px;
        border: 1px solid white;
    }

    & input[type="radio"] {
        opacity: 0.01;
        z-index: 100;
    }

    & input[type="radio"]:checked+label,
    .Checked+label {
        background: #86c5fa;
        color: #333333;
    }

    & label {
        cursor: pointer;
        z-index: 90;
    }

    & label:hover {
        background: rgb(0,0,0,0.2);
    }
`;

const Field = ({ className, question_id, field, answer, editing, onAnswerEdit, isAnswerWrong }) => {
    let colons_number = (field.match(/:/g) || []).length;
    let name = field.substr(1, field.search(':') - 1);
    let type;
    let check;
    let field_without_name = field.substr(field.search(':') + 1, field.length - field.search(':'));
    if(colons_number == 1){
        type = field_without_name.substr(0, field_without_name.length-1);
    } else {
        type = field_without_name.substr(0, field_without_name.search(':'));
        check = field_without_name.substr(field_without_name.search(':') + 1, field_without_name.length - field_without_name.search(':') - 2);
    }
    return(
        <span className={className}>{
            editing 
            ? 
                type == "int" ? 
                    <input type='number' defaultValue={answer[name]} onChange={(e) => onAnswerEdit(question_id, name, parseInt(e.currentTarget.value))}/>
                : type == "text_area" ? 
                    <textarea cols="100" value={answer[name]}  onChange={(e) => onAnswerEdit(question_id, name, e.currentTarget.value)}></textarea>
                : type.includes('/') ? 
                    <ButtonsGroup>
                        {type.split('/').map(m => 
                                <li>
                                    <input type='radio' onClick={(e) => onAnswerEdit(question_id, name, e.currentTarget.value)} id={name+m} name={name} value={m} defaultChecked={answer[name] == m}/>
                                    <label htmlFor={name+m}>{m}</label>
                                </li>
                        )}
                    </ButtonsGroup>

                : "type not found"
            : typeof answer[name] ==='undefined' ? '...' : <b>{answer[name]}</b>
        }{check && isAnswerWrong(question_id, name) && <CheckError> {check}</CheckError>}</span>
    )
}

const MainField = styled(Field)`
    float: right;
`;

const QuestionLine = ({ question_id, question, answer, index, editing, onAnswerEdit, isAnswerWrong }) => {
    let regex = /\{[a-z | 0-9 |: |\/|\>|_|=]*\}/gm;
    let fields = question.match(regex)
    let mainField = fields.shift()
    question = question.replace(mainField, '')
    let questionArray = []
    while(fields.length > 0){
        let index = question.search(fields[0])
        if(index == 0){
            question = question.replace(fields[0], '')
            questionArray.push(<Field key={question+question_id} question_id={question_id} answer={answer} field={fields.shift()} editing={editing} onAnswerEdit={onAnswerEdit} isAnswerWrong={isAnswerWrong}/>)
        }else{
            let substr = question.substr(0, index)
            questionArray.push(substr)
            question = question.replace(substr, '')
        }
    }
    questionArray.push(question)
    return(
        <Line>2.{index}&emsp;{questionArray}<MainField key={question+question_id} question_id={question_id} answer={answer} field={mainField} editing={editing} onAnswerEdit={onAnswerEdit} isAnswerWrong={isAnswerWrong}/></Line>
    )
}

const ProtocolFormalAssessment = ({ questions, answers, editing, onAnswerEdit, isAnswerWrong={isAnswerWrong} }) => {
    return(
        <Container>
            <SectionHeader>2. Ocena formalna</SectionHeader>
            {(() => {
                let lines = [];
                for(let i = 0; i < questions.length; i++){
                    let question = questions[i];
                    let answer = answers.find(a => a.question_id == question.id) || {"text": JSON.stringify({})}
                    lines.push(<QuestionLine key={question.id} question_id={question.id} question={question.text} answer={JSON.parse(answer.text)} index={i+1} editing={editing} onAnswerEdit={onAnswerEdit} isAnswerWrong={isAnswerWrong}/>)
                }
                return lines;
            })()}
        </Container>
    )
}

export const ProtocolPreview = ({ protocol, details, questions, answers, editing, onAnswerEdit, isAnswerWrong }) => {
    return(
        <ProtocolContainer>
            <ProtocolHeader date={protocol.creation_date}/>
                { typeof hospitals !== "undefined" &&
                    <ProtocolHospitalizationCommittees hospitals={details.hospitals}/>
                }      
                { typeof details !== "undefined" && typeof answers !== "undefined" && 
                    <>
                        <ProtocolIntroductoryInformation hospitalized={details.hospitalized} course={details.course} group={details.group}/>
                        <ProtocolFormalAssessment questions={questions} answers={answers} editing={editing} onAnswerEdit={onAnswerEdit} isAnswerWrong={isAnswerWrong}/>
                    </>
                }
        </ProtocolContainer>
    )
}
