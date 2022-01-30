export const fetchAddOrUpdateProtocolAnswers = (protocol_id, answers) => {
    return fetch(
        "http://127.0.0.1:5000/protocols/" + protocol_id + "/answers",
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

