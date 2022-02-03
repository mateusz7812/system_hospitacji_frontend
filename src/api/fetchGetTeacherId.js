export const fetchGetTeacherId = (teacher_firstName, teacher_lastName, teacher_zhz) => {
    return fetch('http://127.0.0.1:5000/teacher?teacher_firstName=' + teacher_firstName + '&teacher_lastName=' + teacher_lastName + '&teacher_zhz=' + teacher_zhz).then(response=>response.json());
}