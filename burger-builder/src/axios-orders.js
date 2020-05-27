import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-fe482.firebaseio.com/'
});

export default instance;