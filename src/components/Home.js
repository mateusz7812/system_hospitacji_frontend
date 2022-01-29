import React, {useState} from 'react';
import styled from 'styled-components';
import ProtocolsPage from './Protocol/ProtocolsPage';
import HospitationsPage from './Hospitalization/HospitationsPage.js';
import HospitalizationCommitteesPage from './Hospitalization_committee/HospitalizationCommitteesPage';

const Container = styled.div`
    width: 100%;
`;

const Menu = styled.div`
    width: 20%;
    position: fixed;
    background-color: #333333;
    height: 100%;
    font-weight: bolder;
`;

const Page = styled.div`
    width: 80%;
    float: right;
    padding-top: 2vw;
`;

const MenuHeader = styled.div`
    margin-top: 15%;
    text-align: left;
    padding-left: 10%;
`;

const MenuHeaderTitle = styled.div`
    font-size: 36px;
`;

const MenuHeaderSubtitle = styled.div`
    margin-top: 5%;
    font-size: 16px;
`;

const MenuItems = styled.div`
    width: 100%;
    margin-top: 20%;
`;

const MenuItem = styled.a`
    width: 100%;
    display: block;
    text-align: left;
    padding-left: 20%;
    font-size: 25px;
    color: inherit;
    height: 50px;
`;

const MenuFooter = styled.div`
    position: absolute;
    bottom: 0;
    height: 20%;
    width: 100%;
    font-size: 17px;
    text-align: left;
    padding-left: 15%;
`;

const MenuFooterText = styled.div`
    width: 100%;
`;

const MenuFooterLink = styled.div`
    width: 100%;
    margin-top: 15px;
`;

const BadgeCircle = styled.span`
    box-sizing: border-box;
    border-radius: 10px;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
`;


const Home = () => {
    const [page, setPage] = useState(null);

    const protocolsPage = <ProtocolsPage setPage={setPage}/>
    const hospitationsPage = <HospitationsPage setPage={setPage}/>
    return (
        <Container>
            {
                (()=>{
                    if(page == null){
                        setPage(protocolsPage)
                    }
                })()
            }
            <Menu> 
                <MenuHeader>
                    <MenuHeaderTitle>System hospitacji</MenuHeaderTitle>
                    <MenuHeaderSubtitle>Zalogowano jako Adam Kowalski,<br/>Nauczyciel akademicki</MenuHeaderSubtitle>
                </MenuHeader>
                <MenuItems>
                    <MenuItem id='HospitationsMenuItem' onClick={()=>setPage(hospitationsPage)}>Hospitacje</MenuItem>
                    <MenuItem id='ProtocolsMenuItem' onClick={()=>setPage(protocolsPage)}>Protokoły</MenuItem>
                    <MenuItem id='HospitalizationCommitteesMenuItem' onClick={()=>setPage(<HospitalizationCommitteesPage/>)}>Komisje hospitacyjne</MenuItem>
                </MenuItems>
                <MenuFooter>
                    <MenuFooterText>System hospitacji<br/>Politechniki Wrocławskiej</MenuFooterText>
                    <MenuFooterLink>hospitacje.pwr.edu.pl</MenuFooterLink>
                </MenuFooter>
            </Menu>
            <Page> 
                {page}
            </Page>
        </Container>
    );
}

export default Home;
