
export const fetchEditHospitationDate = (hospitation_id, date) => {
    return fetch("http://127.0.0.1:5000/hospitations/edit?hospitation_id=23344hospitacja&date=" + date)
    //  + hospitation_id + "&date=" + date)
}