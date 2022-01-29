import { useEffect } from "react";
import { useProtocolContext } from "./useProtocolContext";
import {useCancellablePromise} from '../useCancellablePromise';
import { fetchProtocolAnswers } from "../../api/fetchProtocolAnswers";

export const useProtocolAnswers = (protocol_id) => {
    const { state, dispatch } = useProtocolContext();
    const { cancellablePromise } = useCancellablePromise();

    useEffect(() => {
        const fetchAnswers = async () => {
            const answers = await cancellablePromise(fetchProtocolAnswers(protocol_id));
            dispatch({
                    type: 'PROTOCOL_ANSWERS',
                    protocolAnswers: answers,
                    protocolId: protocol_id
            });
        };
        fetchAnswers();
    }, []);
    const protocolAnswers = state.protocolAnswers[protocol_id];
    return {
        protocolAnswers
    };
}