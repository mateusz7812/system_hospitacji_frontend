
export const fetchHospitalizationCommitteesItems = () => {
    return fetch('http://127.0.0.1:5000/committees').then(response=>response.json());
}

