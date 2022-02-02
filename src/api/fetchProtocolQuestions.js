import { API_ADDRESS } from '../consts';

export const fetchProtocolQuestions = () => {
    return fetch(API_ADDRESS + '/protocols/questions').then(response=>response.json());
}

