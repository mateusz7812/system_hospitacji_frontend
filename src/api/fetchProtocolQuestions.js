
export const fetchProtocolQuestions = () => {
    return fetch('http://127.0.0.1:5000/protocols/questions').then(response=>response.json());
}

