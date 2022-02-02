
export const fetchHospitationItems = () => {
    return fetch('http://127.0.0.1:5000/hospitations?teacher_id=123nauczyciel').then(response=>response.json());
}

