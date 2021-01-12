import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-86fc6-default-rtdb.firebaseio.com/'
});

export default instance;