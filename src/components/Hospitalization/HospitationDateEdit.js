import React from 'react';
import styled from 'styled-components';
import { useHospitationsList } from '../../hooks/Hospitations/useHospitationsList';
import { HospitationItems } from './HospitationItems';
import cache from '../../cache';
import HospitationsPage from './HospitationsPage';
import { fetchEditHospitationDate } from "../../api/fetchEditHospitationDate";

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

const ButtonDefault = styled.button`
    position: relative;
    left: 38%;
    height: 40px;
    width: 100px;
    background: #86c5fa;
    border-radius: 4px;
    color: #333333;
    border: none;
    font-weight: bold
`;

const ButtonNondefault = styled.button`
    position: relative;
    left: 38%;
    margin-left: 20px;
    height: 40px;
    width: 100px;
    background: #284156; 
    border-radius: 4px;
    color: #86c5fa;
    border: solid;
    border-color: #86c5fa;
    border-width: thin;
    font-weight: bold
`;
var editMode = true

function switchEditMode(){
    editMode = !editMode;
}



function save( setPage, hospitation_id, editedId){
    fetchEditHospitationDate(hospitation_id, getNewDate()).then(
        status => {
            let code = false;
            if (status.status != 200){
                code = true;
            }
            setPage(<HospitationsPage setPage={setPage} valStatus={true} code={code} />)
        }
    )
}
function clearChache(){
    cache.value = ""
}
function getNewDate(){
    return cache.value
}


function cancel(setPage){
    switchEditMode()
    setPage(<HospitationsPage setPage={setPage} valStatus={false} code={false} />)
}

const HospitationDateEdit = ({hospitation, setPage, editedId}) => {
    const {hospitationItems} = useHospitationsList();
    editMode = true;
    return (
        <>
            <PageHeader >
                <HeaderTitle>
                    Twoje hospitacje
                </HeaderTitle>
                <ColumnsTitles>
                    <ColumnTitle>Data hospitacji</ColumnTitle>
                    <ColumnTitle>Charakter</ColumnTitle>
                    <ColumnTitle width={3}>Kurs</ColumnTitle>
                    <ColumnTitle width={2}>Przewodnicz??cy komisji hospitacyjnej</ColumnTitle>
                    <ColumnTitle>Status</ColumnTitle>
                </ColumnsTitles>
            </PageHeader>
            <HospitationItems setPage={setPage} hospitations={hospitationItems} editedId={editedId}/>
            {
                editMode? 
                    <ButtonDefault onClick={() => save(setPage, '234hospitacja', editedId)}>Zapisz</ButtonDefault>:   null
            }
            {
                editMode? 
                <ButtonNondefault onClick={() => cancel(setPage)} >Anuluj</ButtonNondefault>:  null
            }
            
        </>
    );
}

export default HospitationDateEdit;