export const fetchTeacher = (id) => {
    return fetch('http://127.0.0.1:5000/teachers/' + id).then(response=>response.json());
}