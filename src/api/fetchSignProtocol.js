import { API_ADDRESS } from '../consts';

export const fetchSignProtocol = (protocol_id) => {
    return fetch(API_ADDRESS + "/protocols/" + protocol_id + "/sign")
}