import axios from 'axios'

//Ezio Auditore da Firenze xD
const ezio = axios.create({
    baseURL: 'http://192.168.1.139:80',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default ezio;