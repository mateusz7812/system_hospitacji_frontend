import React, {useState} from 'react';
import { ProtocolItem } from "./ProtocolItem"

export const ProtocolItems = ({protocols}) => {
    return(
        <>
            {
                protocols.map((t) =>
                    <ProtocolItem key={t.id} protocol={t} />)
            }
        </>
    )
}