import React, {useState} from 'react';
import styled from 'styled-components';
import ProtocolPrevievPage from './ProtocolPreviewPage'

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

export const ProtocolItem = ({protocol, setPage}) => {
    return(
        <Item id={protocol.id} onClick={()=>setPage(<ProtocolPrevievPage protocol={protocol} setPage={setPage}/>)}><Value>{protocol.creation_date}</Value> <Value>{protocol.character}</Value> <Value width={3}>{protocol.course}</Value> <Value width={2}>{protocol.committee_head}</Value> <Value>{protocol.status}</Value></Item>
    )
}