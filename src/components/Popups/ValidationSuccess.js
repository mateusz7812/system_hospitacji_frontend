import React from 'react'
import './ValidationPopup.css'

function ValidationSuccess(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                {props.children}
                <br></br> 
                            Sukces
            </div>
        </div>
    ): ""
}

export default ValidationSuccess