import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProtocolPreview } from './ProtocolPreview';
import ProtocolsPage from './ProtocolsPage';
import { useProtocolDetails } from '../../hooks/Protocol/useProtocolDetails';
import { useProtocolQuestions } from '../../hooks/Protocol/useProtocolQuestions';
import { useProtocolAnswers } from '../../hooks/Protocol/useProtocolAnswers';
import { useAddOrUpdateProtocolAnswers } from '../../hooks/Protocol/useAddOrUpdateProtocolAnswers';
import { fetchSignProtocol } from "../../api/fetchSignProtocol";
import { Popup } from './Popup';
import usePrevious from '../../hooks/usePrevious';

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

const SignQuestion = styled.div`
    display: inline;
    font-size: 20px;
    font-weight: bolder;
    line-height: 30px;
    margin: 15px 0;
`;

const PageFooter = styled.div`
    background-color: #333333;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    padding: 5px 12px;
`;

const ProtocolsPreviewPage = ({protocol, setPage}) => {
    const { protocolDetails, loadDetails } = useProtocolDetails(protocol.id);
    const { protocolAnswers } = useProtocolAnswers(protocol.id);
    const { protocolQuestions } = useProtocolQuestions();
    const [ editing, setEditing ] = useState(false);
    const { answers, wrongAnswers, setAnswers, onAnswerEdit, saveAnswers, saving } = useAddOrUpdateProtocolAnswers(protocol.id);
    const [ signQuestionVisible, setSignQuestionVisible ] = useState(false);
    const [ singPopupVisible, setSignPopupVisibility ] = useState(false);
    const [ savePopupVisible, setSavePopupVisibility ] = useState(false);
    const [ wrongAnswersPopupVisible, setWrongAnswersPopupVisibility ] = useState(false);
    useEffect(() => {loadDetails()}, [])
    useEffect(() => setAnswers(protocolAnswers), [protocolAnswers])
    const signProtocol = () => {
        protocolDetails.protocol.status = 'Podpisany'
        fetchSignProtocol(protocol.id).then(loadDetails);
        setSignQuestionVisible(false);
        setSignPopupVisibility(true);
    }
    const previousSaving = usePrevious(saving); 
    const saveProtocolAnswers = () =>{
        saveAnswers(); 
    }
    useEffect(()=>{
        if(!saving && previousSaving){
            if(wrongAnswers.length > 0){
                setWrongAnswersPopupVisibility(true);
            }
            else{
                setEditing(false); 
                setSavePopupVisibility(true);
            }
        }
    }, [saving])
    const isAnswerWrong = (question_id, field_name) => {
        return wrongAnswers.filter(a => a.question_id == question_id && a.name == field_name).length == 1;
    }
    return (
        <>
            <PageHeader >
                <HeaderTitle>
                    Podgl??d protoko??u {saving ? "tak" : "nie"} {previousSaving ? "tak" : "nie"}
                </HeaderTitle>
                <ColumnsTitles>
                    <ColumnTitle>Data utworzenia</ColumnTitle>
                    <ColumnTitle>Charakter?</ColumnTitle>
                    <ColumnTitle width={3}>Kurs</ColumnTitle>
                    <ColumnTitle width={2}>Przewodnicz??cy komisji hospitacyjnej</ColumnTitle>
                    <ColumnTitle>Status</ColumnTitle>
                </ColumnsTitles>
                    <Values>
                            <Value>{protocol.creation_date}</Value> 
                            <Value>{protocol.character}</Value> 
                            <Value width={3}>{protocol.course}</Value> 
                            <Value width={2}>{protocol.committee_head}</Value> 
                            { typeof protocolDetails.protocol !== "undefined" 
                                ? <Value id="protocolStatusValue">{protocolDetails.protocol.status}</Value>
                                : <Value></Value>
                            }
                    </Values>
            </PageHeader>
            <PageBody>
                {JSON.stringify(protocolDetails) != "{}" &&
                    <ProtocolPreview protocol={protocol} details={protocolDetails} questions={protocolQuestions} answers={answers} editing={editing} onAnswerEdit={onAnswerEdit} isAnswerWrong={isAnswerWrong}/>
                }
            </PageBody>
            <PageFooter>
                {!signQuestionVisible 
                    ?<>
                        <BlackButton id="returnButton1" onClick={()=>setPage(<ProtocolsPage setPage={setPage}/>)}>Wstecz</BlackButton>
                        {
                            typeof protocolDetails.protocol === "undefined" 
                            ? <></>
                            : protocol.character == "Hospitowany" 
                                ?protocolDetails.protocol.status === "Wystawiony" 
                                    && <>
                                        <BlueButton id="signButton1" onClick={()=>setSignQuestionVisible(true)} >Podpisz</BlueButton>
                                        <BlueButton id="issueButton" >Odwo??aj si??</BlueButton>
                                    </>
                            : protocol.character == "Hospituj??cy" 
                                && <>
                                    {editing
                                        ? <BlueButton onClick={saveProtocolAnswers}>Zapisz</BlueButton>   
                                        : <BlueButton onClick={()=>setEditing(true)}>Edytuj</BlueButton>
                                    }
                                    <BlueButton>Wystaw</BlueButton>
                                </>
                        }
                    </>
                    :<>
                            <SignQuestion>Czy napewno chcesz podpisa?? protok????? (podpisu nie mo??na wycofa??)</SignQuestion>
                            <BlackButton id="returnButton2" onClick={()=>setSignQuestionVisible(false)}>Wstecz</BlackButton>
                            <BlueButton id="signButton2" onClick={() => {signProtocol(); }}>Podpisz</BlueButton>
                    </>
                }
                <div style={{clear: "both"}}></div>
            </PageFooter>
            { singPopupVisible &&
                <Popup>
                    <SignQuestion>Protok???? zosta?? podpisany pomy??lnie</SignQuestion><br/>
                    <BlueButton id="signPopupCloseButton" onClick={()=>setSignPopupVisibility(false)}>Zako??cz</BlueButton>
                </Popup>
            }
            { savePopupVisible &&
                <Popup>
                    <SignQuestion>Protok???? zosta?? zapisany pomy??lnie</SignQuestion><br/>
                    <BlueButton onClick={()=>setSavePopupVisibility(false)}>Zako??cz</BlueButton>
                </Popup>
            }
            { wrongAnswersPopupVisible && 
                <Popup>
                    <SignQuestion>Zapisywanie protoko??u zako??czone niepowodzeniem. <br/> (Poprawne zmiany zosta??y zapisane)</SignQuestion>
                    <div>
                        <BlackButton onClick={()=>setPage(<ProtocolsPage setPage={setPage}/>)}>Porzu??</BlackButton>
                        <BlueButton onClick={()=>setWrongAnswersPopupVisibility(false)} >Popraw</BlueButton>
                    </div>
                </Popup>
            }
        </>
    );
}

export default ProtocolsPreviewPage;