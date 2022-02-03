
export const fetchAcademicItems = () => {
    return fetch('http://127.0.0.1:5000/teachers').then(response=>response.json());
}

