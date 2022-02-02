import { API_ADDRESS } from '../consts';

export const fetchProtocolAnswers = (protocol_id) => {
    return fetch(API_ADDRESS + "/protocols/" + protocol_id + "/answers").then(response=>response.json());
}

