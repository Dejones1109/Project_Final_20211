// use createApi
import axios from 'axios';

const APPLICATION_JSON = 'application/json';
const CONTENT_TYPE = 'Content-Type';
export const Base_URL = "http://112.78.1.28:8888/";


export const client = axios.create({
    baseURL : Base_URL,
    headers: {
        Accept: APPLICATION_JSON,
        [CONTENT_TYPE]: APPLICATION_JSON,
        withCredentials : true,

    }
})

