import { useEffect } from "react";
import {useCancellablePromise} from '../../hooks/useCancellablePromise';
import { fetchAcademicItems} from '../../api/fetchAcademicItems'
import { fetchHospitalizationCommitteesItems } from "../../api/fetchHospitalizationCommitteesItems";
import { fetchProtocolItems } from "../../api/fetchProtocolItems";
import { useProtocolContext } from "../Protocol/useProtocolContext";
import { useAcademicContext } from "./useAcademicContext";
import { fp } from "../../api/fetchHospitalizationCommitteesItems";

export const useAcademicList = () => {
    const { stateee, dispatch } = useAcademicContext();  //maybe problem here
    const { cancellablePromise } = useCancellablePromise();
    useEffect(() => {
        const fetchProtocols = async () => {
            const items = await cancellablePromise(fetchAcademicItems());
            
            dispatch({
                    type: 'ACADEMIC_ITEMS',
                    academicItems: items
            });
                
        };

        fetchProtocols();
        
    }, []);
    const { academicItems } = stateee;
    return {
        academicItems
    };
}