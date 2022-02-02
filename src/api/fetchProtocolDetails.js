import { API_ADDRESS } from '../consts';

export const fetchProtocolDetails = (protocol_id) => {
    return fetch(API_ADDRESS + "/protocols/" + protocol_id).then(response=>response.json());
}

