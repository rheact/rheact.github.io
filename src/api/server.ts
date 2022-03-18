import axios from 'axios';

const HOST = process.env.REACT_APP_BACKEND_URL || '';
const server = new axios.Axios({
    baseURL: HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default server;
