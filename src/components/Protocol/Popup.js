import styled from "styled-components"
import React from 'react';

const PupupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PopupInner = styled.div`
    font-size: medium;
    border: solid;
    position: relative;
    padding: 32px;
    border-color: rgba(121,179,228,255);
    width: 100%;
    max-width: 640px;
    height: 200px;
    font-weight: bold;
    background-color: rgba(40,65,86,255);
    color: rgba(121,179,228,255);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;


export const Popup = ({ children }) => {
    return(
        <PupupContainer>
            <PopupInner>
                {children}
            </PopupInner>
        </PupupContainer>
    )
}