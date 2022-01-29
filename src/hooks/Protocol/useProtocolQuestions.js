import { useEffect } from "react";
import { useProtocolContext } from "./useProtocolContext";
import {useCancellablePromise} from '../useCancellablePromise';
import { fetchProtocolQuestions } from "../../api/fetchProtocolQuestions";

export const useProtocolQuestions = () => {
    const { state, dispatch } = useProtocolContext();
    const { cancellablePromise } = useCancellablePromise();

    useEffect(() => {
        const fetchQuestions = async () => {
            const questions = await cancellablePromise(fetchProtocolQuestions());
            dispatch({
                    type: 'PROTOCOL_QUESTIONS',
                    protocolQuestions: questions
            });
                
        };

        fetchQuestions();
        
    }, []);
    const { protocolQuestions } = state;
    return {
        protocolQuestions
    };
}