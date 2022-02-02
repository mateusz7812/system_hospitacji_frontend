import { API_ADDRESS } from '../consts';

export const fetchHospitationItems = () => {
    return fetch(API_ADDRESS + '/hospitations').then(response=>response.json());
}

