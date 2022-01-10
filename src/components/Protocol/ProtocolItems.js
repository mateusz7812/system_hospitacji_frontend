import React, {useState} from 'react';
import { ProtocolItem } from "./ProtocolItem"

export const ProtocolItems = ({protocols, setPage}) => {
    return(
        <>
            {
                protocols.map((t) =>
                    <ProtocolItem key={t.id} setPage={setPage} protocol={t} />)
            }
        </>
    )
}