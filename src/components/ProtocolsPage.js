import React from 'react';
import styled from 'styled-components';
import { useProtocolsList } from '../hooks/useProtocolsList';
import { ProtocolItems } from './ProtocolItems';

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
    padding: 15px;
    font-size: 17px;
    line-height: 20px;
`;

const ProtocolsPage = ({setPage}) => {
    const { protocolsItems } = useProtocolsList();

    return (
        <>
            <PageHeader >
                <HeaderTitle>
                    Wybór protokołu
                </HeaderTitle>
                <ColumnsTitles>
                    <ColumnTitle>Data utworzenia</ColumnTitle>
                    <ColumnTitle>Charakter?</ColumnTitle>
                    <ColumnTitle width={3}>Kurs</ColumnTitle>
                    <ColumnTitle width={2}>Przewodniczący komisji hospitacyjnej</ColumnTitle>
                    <ColumnTitle>Status</ColumnTitle>
                </ColumnsTitles>
            </PageHeader>
            <ProtocolItems setPage={setPage} protocols={protocolsItems}/>
        </>
    );
}

export default ProtocolsPage;
