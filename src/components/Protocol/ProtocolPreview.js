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
`;

const ComissionMember = ({member}) => (
    <Line>{member.name}, {member.role} komisji hospitującej</Line>
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

const ProtocolHospitalizationCommittees = () =>{
    const members = [{name:"dr. Adam Kowalski", role:"Przewodniczący"},
                    {name:"dr. Adam Kowalski", role:"Członek"},
                    {name:"dr. Adam Kowalski", role:"Członek"},
                    {name:"dr. Adam Kowalski", role:"Członek"}]
    return(
        <Container>
            <SectionHeader>Zespół hospitujący:</SectionHeader>
            {
                members.map((m) => 
                <ComissionMember member={m}/>)
            }
        </Container>
    )
}

const ProtocolIntroductoryInformation = () => {
    const data = {
                            "lecturer": "dr. Adam Kowalski",
                            "course":{
                                "name": "Analiza matematyczna",
                                "code": "A01-11a",
                                "form": "ćwiczenia"
                            },
                            "study": {
                                "degree": "I",
                                "form": "stacjonarne",
                                "semester": "1"
                            },
                            "place": "s101 A1",
                            "term": "poniedziałek 7:30"
                        }
    return(
        <Container>
            <SectionHeader>1. Informacje wstępne</SectionHeader>
            <Line>1.1&emsp;Prowadzący zajęcia/Jednostka organizacyjna: {data["lecturer"]}</Line>
            <Line>1.2&emsp;Nazwa kursu/kierunek studiów: {data["course"]["name"]}</Line>
            <Line>1.3&emsp;Kod kursu: {data["course"]["code"]} Forma dydaktyczna: {data["course"]["form"]}</Line>
            <Line>1.4&emsp;Stopień i forma studiów: {data["study"]["degree"]} {data["study"]["form"]} Semestr {data["study"]["semester"]}</Line>
            <Line>1.5&emsp;Miejsce i termin zajęć (sala, budynek, dzień tygodnia, godziny): {data["place"]} {data["term"]}</Line>
        </Container>
    )
}

export const ProtocolPreview = ({protocol}) => {
    return(
        <ProtocolContainer>
            <ProtocolHeader date={protocol.creation_date}/>
            <ProtocolHospitalizationCommittees/>
            <ProtocolIntroductoryInformation/>
        </ProtocolContainer>
    )
}
