import React from 'react'
import './ValidationPopup.css'
           

function ValidationPopup(props) {
    if (props.trigger)
        {
            return (props.error) ? (
                <div className="popup" onClick={() => props.setTrigger(false)}>
                    <div className="popup-inner">
                        {props.children}
                        
                        <br></br> 
                                    Błąd! Data hospitacji nie może być późniejsza niż ostateczna data hospitacji.
                        <br></br>               Nie może być też wcześńiejsza niż data dzisiejsza!
                        
                    </div>
                </div>
            ): (
            <div className="popup" onClick={() => props.setTrigger(false)}>
                <div className="popup-inner">
                    {props.children}
                    <br></br> 
                                                             Data została zmieniona pomyślnie
                </div>
            </div>)
                

        }
    else return ""
    
}

export default ValidationPopup