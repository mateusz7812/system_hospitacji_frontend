import React from 'react'
import './NotificationPopup.css'
import imag from './logo.jpeg'
function NotificationPopup(props) {
    if (props.trigger)
        {
            return (
                <>
                    <div className="popup1"></div>
                    <div className="popup-inner1">
                            {props.children}
                            <button className="close" onClick={() => props.setTrigger(false)}>x</button>
                            <img className="impsa" height={90} width={80} src={imag}></img>
                            <div className='text'>{`Masz zbliżającą się hospitację: Data: `}{props.date}</div> 
                            <div className='text'>{`Kurs: `}{props.course}</div>
                            <div className='text'>{`Przewodniczący: `}{props.major}</div>
                    </div>
                </>
            )
        }
    else return ""
    
}

export default NotificationPopup