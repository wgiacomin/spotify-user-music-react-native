import axios from 'axios';


const server = axios.create({
    baseURL: 'http://10.0.2.2:3000/data/'
  });


export default server;