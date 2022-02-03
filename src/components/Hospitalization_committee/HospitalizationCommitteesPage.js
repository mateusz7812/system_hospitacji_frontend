import React from 'react';
import styled from 'styled-components';
import { useHospitalizationCommitteeContext } from '../../hooks/HospitalizationCommittee/useHospitalizationCommitteeContext';
import { useHospitalizationCommitteeList } from '../../hooks/HospitalizationCommittee/useHospitalizationCommitteeList';
import { useProtocolsList } from '../../hooks/Protocol/useProtocolsList';
import { HospitalizationCommitteeItems } from './HospitalizationCommitteeItems';
import { useAcademicList } from '../../hooks/Academic/useAcademicList';

const Hosp = styled.div`
background-color: #333333;
width: 90%;
margin-left: 5%;
margin-right: 5%;
padding-top: 50px;
margin-bottom: 20px;
`;

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

const HospitalizationCommitteesPage = ({setPage}) => {
const { hospitalizationCommitteeItems } = useHospitalizationCommitteeList();
const { academicItems } = useAcademicList();
return (
    <>
        <PageHeader >
            <HeaderTitle>
                Przeglądanie komisji hospitacyjnych
            </HeaderTitle>
            <ColumnsTitles>
                <ColumnTitle>Przewodniczący komisji hospitacyjnej</ColumnTitle>
                <ColumnTitle>Członkowie</ColumnTitle>
                <ColumnTitle width={3}></ColumnTitle>
                <ColumnTitle width={2}></ColumnTitle>
                <ColumnTitle>Operacja na członku komisji</ColumnTitle>
            </ColumnsTitles>
        </PageHeader>
        <HospitalizationCommitteeItems setPage={setPage} hospitalizationCommittees={hospitalizationCommitteeItems} academics={academicItems}/>
    </>
);
}
export default HospitalizationCommitteesPage;
