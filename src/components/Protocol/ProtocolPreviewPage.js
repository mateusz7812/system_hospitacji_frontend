import React, { useState } from 'react';
import styled from 'styled-components';
import { ProtocolPreview } from './ProtocolPreview';
import ProtocolsPage from './ProtocolsPage';
import { useProtocolDetails } from '../../hooks/Protocol/useProtocolDetails';
import { useProtocolQuestions } from '../../hooks/Protocol/useProtocolQuestions';
import { useProtocolAnswers } from '../../hooks/Protocol/useProtocolAnswers';


const PageHeader = styled.div`
    background-color: #333333;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    padding-top: 50px;
    margin-bottom: 20px;
`;

const HeaderTitle = styled.div`
    text-align: left;
    padding: 1%;
    font-size: 30px;
    font-weight: bolder;
    margin-bottom: 0;
    padding-bottom: 0;
`;

const ColumnsTitles = styled.div`
    display: flex;
`;

const ColumnTitle = styled.div`
    display: flex;
    flex: ${(props) => props.width || 1} 1 150px;
    text-align: left;
    padding: 15px 15px 10px 15px;
    font-size: 17px;
    line-height: 20px;
`;

const Values = styled.div`
    display: flex;
`;

const Value = styled.div`
    display: flex;
    flex: ${(props) => props.width || 1} 1 150px;
    text-align: left;
    padding: 0px 15px 10px 15px;
    font-size: 16px;
`;

const PageBody = styled.div`
    height: 63vh;
    background-color: #333333;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 20px;
    overflow-y: scroll;
    padding: 60px 80px;
`;

const Button = styled.button`
    float: right;
    height: 35px;
    width: 120px;
    margin: 12px;
    box-sizing: border-box;
    border-radius: 5px;
`;

const BlueButton = styled(Button)`
    background: #86c5fa;
    border: none;
    color: #333333;
`;

const BlackButton = styled(Button)`
    background: #333333;
    border: 1px solid white;
    color: #86c5fa;
`;

const PageFooter = styled.div`
    background-color: #333333;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    padding: 5px 12px;
`;

const ProtocolsPreviewPage = ({protocol, setPage}) => {
    const { protocolDetails } = useProtocolDetails(protocol.id);
    const { protocolAnswers } = useProtocolAnswers(protocol.id);
    const { protocolQuestions } = useProtocolQuestions();
    const [ editing, setEditing ] = useState(false);
    return (
        <>
            <PageHeader >
                <HeaderTitle>
                    Podgląd protokołu
                </HeaderTitle>
                <ColumnsTitles>
                    <ColumnTitle>Data utworzenia</ColumnTitle>
                    <ColumnTitle>Charakter?</ColumnTitle>
                    <ColumnTitle width={3}>Kurs</ColumnTitle>
                    <ColumnTitle width={2}>Przewodniczący komisji hospitacyjnej</ColumnTitle>
                    <ColumnTitle>Status</ColumnTitle>
                </ColumnsTitles>
                <Values>
                    <Value>{protocol.creation_date}</Value> 
                    <Value>{protocol.character}</Value> 
                    <Value width={3}>{protocol.course}</Value> 
                    <Value width={2}>{protocol.committee_head}</Value> 
                    <Value>{protocol.status}</Value>
                </Values>
            </PageHeader>
            <PageBody>
                <ProtocolPreview protocol={protocol} details={protocolDetails} questions={protocolQuestions} answers={protocolAnswers} editing={editing}/>
            </PageBody>
            <PageFooter>
                <BlackButton onClick={()=>setPage(<ProtocolsPage setPage={setPage}/>)}>Wstecz</BlackButton>
                {(()=>{
                    if(protocol.character == "Hospitowany"){
                        return(<>
                            <BlueButton>Podpisz</BlueButton>
                            <BlueButton>Odwołaj się</BlueButton>
                        </>)
                    } else if (protocol.character == "Hospitujący"){
                        if(editing)
                            return(
                            <BlueButton onClick={()=>setEditing(false)}>Zapisz</BlueButton>
                            )
                        else
                            return(<>
                                <BlueButton onClick={()=>setEditing(true)}>Edytuj</BlueButton>
                            </>)
                    }
                })()}
                <div style={{clear: "both"}}></div>
            </PageFooter>
        </>
    );
}

export default ProtocolsPreviewPage;