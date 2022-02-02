import { API_ADDRESS } from '../consts';

export const fetchProtocolReports = () => {
    return fetch(API_ADDRESS + '/protocols/reports?teacher_id=123nauczyciel').then(response=>response.json());
}

