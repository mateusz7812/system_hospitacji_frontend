import { useEffect } from "react";
import { useProtocolContext } from "./useProtocolContext";
import {useCancellablePromise} from '../useCancellablePromise';
import { fetchProtocolDetails } from "../../api/fetchProtocolDetails";

export const useProtocolDetails = (protocol_id) => {
    const { state, dispatch } = useProtocolContext();
    const { cancellablePromise } = useCancellablePromise();

    const fetchDetails = async () => {
        const details = await cancellablePromise(fetchProtocolDetails(protocol_id));
        dispatch({
                type: 'PROTOCOL_DETAILS',
                protocolDetails: details,
                protocolId: protocol_id
        });
    };

    const protocolDetails = state.protocolDetails[protocol_id] || {};
    return {
        protocolDetails,
        loadDetails: fetchDetails
    };
}