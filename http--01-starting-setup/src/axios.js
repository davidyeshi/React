import axios from 'axios';

const instance = axios.create({
    baseURL : "https://jsonplaceholder.cypress.io/"
})

// instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN_FROM_INSTANCE';

export default instance;