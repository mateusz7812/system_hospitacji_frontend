import { useEffect, useState } from "react";
import { useProtocolContext } from "./useProtocolContext";
import { fetchAddOrUpdateProtocolAnswers } from '../../api/fetchAddOrUpdateProtocolAnswers';
import {useCancellablePromise} from '../useCancellablePromise';

export const useAddOrUpdateProtocolAnswers = (protocol_id) => {
  const [ answers, setAnswers ] = useState([]);
  const [ saving, changeSaving ] = useState(false);
  const { dispatch } = useProtocolContext();
  const { cancellablePromise } = useCancellablePromise();

  useEffect(() => {
    const addTodoApiCall = async () => {
      if (saving) {
        await cancellablePromise(fetchAddOrUpdateProtocolAnswers(protocol_id, answers));
        dispatch({
          type: 'PROTOCOL_ANSWERS',
          protocol_id: protocol_id,
          protocolAnswers: answers
        });
        changeSaving(false);
      }
    }
    addTodoApiCall();
    return () => {
    };
  }, [saving]);

  return {
    answers,
    setAnswers,
    onAnswerEdit: (question_id, field_name, new_value) => {
      console.log(question_id + " " + field_name + " " + new_value)
      let new_answers = [...answers]
      let filtered = new_answers.filter(a => a.question_id == question_id)
      if(filtered.length == 0){
        let answer = {}
        let answer_text = {}
        answer_text[field_name] = new_value
        answer["text"] = JSON.stringify(answer_text)
        answer["question_id"] = question_id
        new_answers.push(answer)
      } else {
        let index = new_answers.indexOf(filtered[0])
        let answer_text = JSON.parse(new_answers[index]["text"])
        answer_text[field_name] = new_value
        new_answers[index]["text"] = JSON.stringify(answer_text)
      }
      setAnswers(new_answers)
      console.log(answers)
    },
    saveAnswers: () => {
      changeSaving(true);
    }
  };

};