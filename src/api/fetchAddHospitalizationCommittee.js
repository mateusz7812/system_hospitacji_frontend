export const fetchAddHospitalizationCommittee = (hospitalizationCommittee) => {
    return fetch(
        "http://127.0.0.1:5000/committees",
        {
            method: "post",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(hospitalizationCommittee)
        }    
    ).then(response=>response.json());
}