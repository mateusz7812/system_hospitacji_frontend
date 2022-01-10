import { useEffect } from "react";
import { useProtocolContext } from "./useProtocolContext";
import {useCancellablePromise} from '../../hooks/useCancellablePromise';
import { fetchProtocolItems } from "../../api/fetchProtocolItems";

export const useProtocolsList = () => {
    const { state, dispatch } = useProtocolContext();
    const { cancellablePromise } = useCancellablePromise();

    useEffect(() => {
        const fetchProtocols = async () => {
            const items = await cancellablePromise(fetchProtocolItems());
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