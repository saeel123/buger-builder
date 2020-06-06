import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://real-burger-builder-a5a36.firebaseio.com/'
});

export default instance;