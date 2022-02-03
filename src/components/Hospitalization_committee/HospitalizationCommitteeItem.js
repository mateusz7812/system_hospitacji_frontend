import React, {useState} from 'react';
import styled from 'styled-components';
import { fetchTeacher } from '../../api/fetchTeacher';

const Button = styled.button`
    margin-right: 20px;
    height: 40px;
    width: 40px;
    background: #72a4cd; 
    border-radius: 8px;
    color: #333333;
    border: none;
    font-weight: bold;
`;

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

const Value2 = styled.div`
    display: flex;
    flex: ${(props) => props.width || 1} 1 80px;
    text-align: left;
    padding: 10px 15px;
    font-size: 16px;
`;


function arrayToString(array) {
    let result = "";
    for (const element of array) {
        result += element["first_name"]+" "+element["last_name"]+`
        `
      }
    return result
}


export const HospitalizationCommitteeItem = ({hospitalizationCommittee, setPage}) => {
    return(
        <Item ><Value>{hospitalizationCommittee.committee_head}</Value> <Value2>{arrayToString(hospitalizationCommittee.committee_members)}</Value2> <Value width={3}>{hospitalizationCommittee.c}</Value> <Value width={2}>{hospitalizationCommittee.c}</Value> <Value>{hospitalizationCommittee.status}</Value>
        <Value>{<div><Button>+</Button><Button>-</Button></div>}</Value>
        </Item>
    )
}