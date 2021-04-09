import axios from 'axios';
//making request to backend with auth token
export const createUpdateUser = async (authtoken)=> {
    return axios.post(`${process.env.REACT_APP_API}/create-update-user`,{},{
        headers: {
            authtoken: authtoken,

        },
    })
};
export const currentUser = async (authtoken)=> {
    return axios.post(`${process.env.REACT_APP_API}/current-user`,{},{
        headers: {
            authtoken: authtoken,

        },
    })
};