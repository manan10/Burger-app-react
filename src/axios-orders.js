import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-app-react-4a46b.firebaseio.com/'
});

export default instance;