import React, {useState} from 'react';
import { HospitalizationCommitteeItem } from "./HospitalizationCommitteeItem";
import Popup from './Popup';
import { EditionItem } from "./EditionItem"
import styled from 'styled-components';
import HospitalizationCommittee from '../../HospitalizationCommittee';
import { fetchAddHospitalizationCommittee } from '../../api/fetchAddHospitalizationCommittee';
import { fetchGetTeacherId } from '../../api/fetchGetTeacherId';

const Button = styled.button`
    margin-top: 30px;
    margin-right: 160px;
    height: 80px;
    width: 100px;
    background: #72a4cd; 
    border-radius: 8px;
    color: #333333;
    border: none;
    font-weight: bold;
    float: right;
`;

const List = styled.li`
    max-height: 500px;
    overflow-y: auto;
    list-style-type: none; /* Remove bullets */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margins */
`

const Button2 = styled.button`
    margin-top: 10px;
    margin-right: 40px;
    height: 50px;
    background: #72a4cd; 
    border-radius: 8px;
    color: #333333;
    border: none;
    font-weight: bold;
    float: right;
    
`;

const Header = styled.h2`
    background-color: #333333;
    color: #72a4cd;
    font-size: 18px;
    margin-right: 5%;
    margin-bot: 0%;
`

function getId() {
    return Math.floor(Math.random() * (999999 - 0 + 1)) + 0;
}



export const HospitalizationCommitteeItems = ({hospitalizationCommittees, academics, setPage}) => {
    const [isClicked, setIsClicked] = useState(false);
    const [choosingHead, setChoosingHead] = useState(false);
    const [toAdd, setToAdd] = useState(false);
    const [clickedItems, setClickedItems] = useState([]);
    const myItems = [];
    const marked = true;
    const checked = [];

    const handleClick = () => {
        setIsClicked(true)
    }

    const closePopup = () => {
        setIsClicked(false)
        
        
    }



    const closePopupHead = () => {
        setChoosingHead(false)
        
    }

    const handleClickEdit = (val) => {
        // setToAdd(!toAdd)
        console.log(toAdd)
        console.log("val=",val);
        

    }

    const loadIdAndAdd = async (checked) => {
        const foundId = await fetchGetTeacherId(checked[0]["first_name"], checked[0]["last_name"], checked[0]["zhz"]).then((fo) => fo)
        const newHosp = new HospitalizationCommittee(getId(), foundId, clickedItems)
        
        const addedCorrectly = await fetchAddHospitalizationCommittee(JSON.stringify(newHosp));
        return addedCorrectly;

    }

    const createNewCommittee = () => {
        setClickedItems(myItems)
        setIsClicked(false)
        setChoosingHead(true)
    }

    const canAddCommittee = () => {
        return !(checked.length !== 1 || clickedItems.length === 0);
    }

    const createNewCommitteeWithHead = () => {
        setChoosingHead(false)
        
        if(canAddCommittee()) {
        const response = loadIdAndAdd(checked)
        window.location.reload(false);
        }
        
    }

    
    
    return(
        <>
            {
                hospitalizationCommittees.map((t) =>
                    <HospitalizationCommitteeItem key={t.id} setPage={setPage} hospitalizationCommittee={t} />)
            }
            <Button onClick={ handleClick}>dodaj nowa komisje</Button>
            { isClicked &&
            <Popup trigger={isClicked}>
                <List>
                <Header>Imie &nbsp;&nbsp;&nbsp;&nbsp;Nazwisko Nalezy<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; do zhz</Header>
                {academics.map((t) =>
                    <li key={t.id}>
                    <EditionItem onClick={handleClickEdit(t.id)} key={t.id} setPage={setPage} toAdd={false} myItems={myItems} hospitalizationCommittee={t} /></li>)   }
                    
                    
                </List>
                
                <div className='but'><Button2 onClick={closePopup}>Odrzuc</Button2> <Button2 onClick={createNewCommittee}>Zapisz</Button2></div>
            </Popup>
            
            }
            { choosingHead &&
            <Popup trigger={choosingHead}>
                <List>
                <Header>Wybierz przewodniczącego komisji</Header>
                {clickedItems.map((t) =>
                    <li key={t.id}>
                    <EditionItem onClick={handleClickEdit(t.id)} key={t.id} setPage={setPage} marked={marked} checked={checked} myItems={myItems} hospitalizationCommittee={t} /></li>)   }
                    
                    
                </List>
                
                <div className='but'><Button2 onClick={closePopupHead}>Odrzuc</Button2> <Button2 onClick={createNewCommitteeWithHead}>Zapisz</Button2></div>
            </Popup>
            
            }
            
        </>
    )
}