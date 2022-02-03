import React, {useState} from 'react';
import styled from 'styled-components';

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
    margin-bottom: 0px;
    display: flex;
    border: ${props => props.color};
`;

const Value = styled.div`
    display: flex;
    flex: ${(props) => props.width || 1} 1 150px;
    text-align: left;
    padding: 10px 15px;
    font-size: 16px;
`;
export const EditionItem = ({hospitalizationCommittee, toAdd, marked, checked, myItems, setPage}) => {
    const [clicked, setClicked] = useState(true);
    const [color, setColor] = useState('5px solid #333333');

    const handleMarked = () => {
        if(checked[0] === hospitalizationCommittee) {
            color === '5px solid #333333' ? setColor('5px solid #72a4cd') : setColor('5px solid #333333');
            setClicked(!clicked)
            var index = myItems.indexOf(hospitalizationCommittee);
            if (index !== -1) {
                myItems.splice(index, 1);
            }
            checked.pop();
        } else if (checked.length === 0) {
            color === '5px solid #333333' ? setColor('5px solid #72a4cd') : setColor('5px solid #333333');
            setClicked(!clicked)
            myItems.push(hospitalizationCommittee)
            checked.push(hospitalizationCommittee)
        }
    }

    const handleClick = () => {
        if(marked) {
            handleMarked()
            return;
        }
        
        color === '5px solid #333333' ? setColor('5px solid #72a4cd') : setColor('5px solid #333333');
        setClicked(!clicked)
        if(clicked) {
            myItems.push(hospitalizationCommittee)
            
        }else {
            var index = myItems.indexOf(hospitalizationCommittee);
            if (index !== -1) {
                myItems.splice(index, 1);
            }
            
        }
    }
    return(
        <Item color={color} clicked={true} onClick={handleClick}><Value>{hospitalizationCommittee.first_name}</Value> <Value>{hospitalizationCommittee.last_name}</Value> <Value>{hospitalizationCommittee.zhz ? "+" : "-"}</Value> 
        <Value></Value>
        </Item>
    )
}
