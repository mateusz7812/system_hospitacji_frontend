
export const fetchProtocolItems = () => {
    return fetch('http://127.0.0.1:5000/protocols').then(response=>response.json());
}

