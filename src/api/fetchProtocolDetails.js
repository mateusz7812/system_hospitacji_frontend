export const fetchProtocolDetails = (protocol_id) => {
    return fetch("http://127.0.0.1:5000/protocols/" + protocol_id).then(response=>response.json());
}

