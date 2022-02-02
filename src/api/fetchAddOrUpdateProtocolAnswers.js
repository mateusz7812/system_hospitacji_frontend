import { API_ADDRESS } from '../consts';

export const fetchAddOrUpdateProtocolAnswers = (protocol_id, answers) => {
    return fetch(
        API_ADDRESS + "/protocols/" + protocol_id + "/answers",
        {
            method: "post",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(answers)
        }    
    ).then(response=>response.json());
}

