import { useEffect } from "react";
import { useHospitationContext } from "./useHospitationContext";
import {useCancellablePromise} from '../useCancellablePromise';
import { fetchHospitationItems } from "../../api/fetchHospitationItems";


export const useHospitationsList = () => {
    const { state1, dispatch } = useHospitationContext();
    const { cancellablePromise } = useCancellablePromise();
    
    useEffect(() => {
        const fetchHospitations = async () => {
            const items = await cancellablePromise(fetchHospitationItems());
            dispatch({
                    type: 'HOSPITATION_ITEMS',
                    hospitationItems: items
            });
                
        };

        fetchHospitations();
    }, []);
    const { hospitationItems } = state1;
    
    return {
        hospitationItems
    };
}