import React, {useState} from 'react';
import { Tabs, Badge } from 'antd';
import styled from 'styled-components';
import AddToDo from './AddToDo';
import ToDoItems from './ToDoItems';
import { useToDoList } from '../hooks/useToDoList';
import { useProtocolsList } from '../hooks/useProtocolsList';
import ProtocolsPage from './ProtocolsPage';
import HospitalizationsPage from './HospitalizationsPage';
import HospitalizationCommitteesPage from './HospitalizationCommittees';
const { TabPane } = Tabs;

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
    padding-top: 3vw;
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

const TodoContainer = styled.div`
`;

const TabTitle = styled.span`
    padding-right: 0.75rem;
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

const AllItemsBadge = styled(BadgeCircle)`
    background-color: #fff;
    color: #999;
    box-shadow: 0 0 0 1px #d9d9d9 inset ;
`

const CompletedItemBadge = styled(BadgeCircle)`
    background-color: #52c41a;
`


const ToDoHome = () => {
    const { todoItems, openToDoItems, completeToDoItems } = useToDoList();
    const [page, setPage] = useState(1);

    return (
/*        <Container>
            <AddToDo />
            <TodoContainer>
                <Tabs defaultActiveKey="1" size={"large"}>
                    <TabPane tab={
                        <Badge count={openToDoItems.length} overflowCount={99}><TabTitle>Open</TabTitle></Badge>
                    } key="1">
                        <ToDoItems todoItems={openToDoItems} />

                    </TabPane>
                    <TabPane tab={<Badge count={completeToDoItems.length && <CompletedItemBadge>{completeToDoItems.length}</CompletedItemBadge>} overflowCount={99}>
                        <TabTitle>Completed</TabTitle></Badge>} key="2">
                        <ToDoItems todoItems={completeToDoItems} />

                    </TabPane>
                    <TabPane tab={<Badge count={todoItems.length && <AllItemsBadge>{todoItems.length}</AllItemsBadge>} overflowCount={99}><TabTitle>All</TabTitle></Badge>} key="3">
                        <ToDoItems todoItems={todoItems} />
                    </TabPane>
                </Tabs>

            </TodoContainer>
        </Container>
*/
        <Container>
            <Menu> 
                <MenuHeader>
                    <MenuHeaderTitle>System hospitacji</MenuHeaderTitle>
                    <MenuHeaderSubtitle>Zalogowano jako Adam Kowalski,<br/>Nauczyciel akademicki</MenuHeaderSubtitle>
                </MenuHeader>
                <MenuItems>
                    <MenuItem onClick={()=>setPage(0)}>Hospitacje</MenuItem>
                    <MenuItem onClick={()=>setPage(1)}>Protokoły</MenuItem>
                    <MenuItem onClick={()=>setPage(2)}>Komisje hospitacyjne</MenuItem>
                </MenuItems>
                <MenuFooter>
                    <MenuFooterText>System hospitacji<br/>Politechniki Wrocławskiej</MenuFooterText>
                    <MenuFooterLink>hospitacje.pwr.edu.pl</MenuFooterLink>
                </MenuFooter>
            </Menu>
            <Page> 
                {(() => {
                    if (page == 0) {
                        return (
                            <HospitalizationsPage/>
                        )
                    } else if (page == 1) {
                        return (
                            <ProtocolsPage/>
                        )
                    } else {
                        return (
                            <HospitalizationCommitteesPage/>
                        )
                    }
                    })()}
            </Page>
        </Container>
    );
}

export default ToDoHome;
