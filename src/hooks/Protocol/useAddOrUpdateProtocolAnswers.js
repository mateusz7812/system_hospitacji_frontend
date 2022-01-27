import { useEffect, useState } from "react";
import { fetchAddOrUpdateProtocolAnswers } from '../api/fetchAddOrUpdateProtocolAnswers';
import { useToDoContext } from "./useTodoContext";
import {useCancellablePromise} from '../hooks/useCancellablePromise';

export const useAddOrUpdateProtocolAnswers = (protocol_id, protocolAnswers) => {
  const [ answers, setAnswers ] = useState(protocolAnswers);
  const [ saving, saveAnswers ] = useState(false);
  const { dispatch } = useProtocolContext();
  const { cancellablePromise } = useCancellablePromise();

  useEffect(() => {
    const addTodoApiCall = async () => {
      if (saving) {
        await cancellablePromise(fetchAddOrUpdateProtocolAnswers(protocol_id, answers));
        dispatch({
          type: 'ADD_OR_UPDATE_PROTOCOL_ANSWERS',
          protocol_id: protocol_id,
          protocolAnswers: answers
        });
        saveAnswers(false);
      }
    }
    addTodoApiCall();
    return () => {
    };
  }, [saving]);


  return {
    answers,
    onChange: (field_name, new_value) => {
      new_answers = [...answers]
      setAnswers(new_answers)
    },
    onSave: () => {
      saveAnswers(true);
    }
  };

};