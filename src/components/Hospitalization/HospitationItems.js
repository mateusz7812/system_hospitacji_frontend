import React, {useState} from 'react';
import { HospitationItem } from "./HospitationItem"

export const HospitationItems = ({hospitations, setPage, editedId}) => {
    return(
        <>
            {
                hospitations.map((t) =>
                    <HospitationItem key={t.id} setPage={setPage} hospitation={t} editedId={editedId} />)
            }
        </>
    )
}