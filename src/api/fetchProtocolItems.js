
export const fetchProtocolItems = () => {
    return fetch('http://127.0.0.1:5000/protocols/reports?teacher_id=123nauczyciel').then(response=>response.json());
}

