import React from 'react'
import styled from 'styled-components';
 import './popup.css'



const Div12 = styled.div `
    
`

function Popup(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                { props.children }
                <br></br>
            </div>
            
        </div>
    ) : "";
}


export default Popup