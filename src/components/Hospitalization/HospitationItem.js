import React, {useState} from 'react';
import styled from 'styled-components';
import HospitationDateEdit from './HospitationDateEdit'
import cache from '../../cache';

const Item = styled.div`
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    background-color: #333333;
    margin-bottom: 7px;
    display: flex;
`;

const Value = styled.div`
    display: flex;
    flex: ${(props) => props.width || 1} 1 150px;
    text-align: left;
    padding: 10px 15px;
    font-size: 16px;
`;

const Button = styled.button`
    margin-left: 30px;
    height: 30px;
    background: #72a4cd; 
    border-radius: 8px;
    color: #333333;
    border: none;
    font-weight: bold;
`;

const TextField = styled.input`
    width: 130px;
    border-color: white;
    border-radius: 4px;
    background: #4a4a4a;
    width: '20%',           
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500

`;

function editButtonClicked(hospitation,e,setPage, button){
    e.stopPropagation()
    setPage(<HospitationDateEdit hospitation={hospitation} setPage={setPage} editedId={button} />)
}


export const HospitationItem = ({hospitation, setPage, editedId, value}) => {
    return(
        <Item onClick={(e)=>{e.stopPropagation();}}>
         <Value>{hospitation.creation_date == "nieustalona" && editedId == hospitation.id? 
            <TextField type="text" name="name" value={cache.value} onChange={e => {cache.value = e.target.value;console.log(cache.value )}} onClick={e => e.stopPropagation()}/>: hospitation.creation_date}{hospitation.creation_date == "nieustalona" && editedId == null? 
            <Button id={hospitation.id} 
             onClick={(e) => editButtonClicked(hospitation, e, setPage, hospitation.id)}
            >Edytuj</Button>: null}
         </Value> 
         <Value>{hospitation.character}</Value> <Value width={3}>{hospitation.course}</Value>
         <Value width={2}>{hospitation.committee_head}</Value>
         <Value>{hospitation.status}</Value>
        </Item>
    )
}