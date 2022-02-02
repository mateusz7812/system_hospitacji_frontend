import { useEffect } from "react";
import { useProtocolContext } from "./useProtocolContext";
import {useCancellablePromise} from '../useCancellablePromise';
import { fetchProtocolReports } from "../../api/fetchProtocolReports";

export const useProtocolsReports = () => {
    const { state, dispatch } = useProtocolContext();
    const { cancellablePromise } = useCancellablePromise();

    useEffect(() => {
        const fetchProtocols = async () => {
            const items = await cancellablePromise(fetchProtocolReports());
            dispatch({
                    type: 'PROTOCOL_ITEMS',
                    protocolItems: items
            });
                
        };

        fetchProtocols();
        
    }, []);
    const { protocolItems } = state;
    return {
        protocolItems
    };
}