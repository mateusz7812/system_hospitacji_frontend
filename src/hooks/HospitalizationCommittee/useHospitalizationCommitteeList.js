import { useEffect } from "react";
import { useHospitalizationCommitteeContext } from "./useHospitalizationCommitteeContext";
import {useCancellablePromise} from '../../hooks/useCancellablePromise';
import { fetchHospitalizationCommitteesItems } from "../../api/fetchHospitalizationCommitteesItems";
import { fetchProtocolItems } from "../../api/fetchProtocolItems";
import { useProtocolContext } from "../Protocol/useProtocolContext";
import { fp } from "../../api/fetchHospitalizationCommitteesItems";

export const useHospitalizationCommitteeList = () => {
    const { statee, dispatch } = useHospitalizationCommitteeContext();  //maybe problem here
    const { cancellablePromise } = useCancellablePromise();
    useEffect(() => {
        const fetchProtocols = async () => {
            const items = await cancellablePromise(fetchHospitalizationCommitteesItems());
            
            dispatch({
                    type: 'HOSPITALIZATIONCOMMITTEE_ITEMS',
                    hospitalizationCommitteeItems: items
            });
                
        };

        fetchProtocols();
        
    }, []);
    const { hospitalizationCommitteeItems } = statee;
    return {
        hospitalizationCommitteeItems
    };
}