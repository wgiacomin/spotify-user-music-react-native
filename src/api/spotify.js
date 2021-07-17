import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const spotify = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

});

spotify.interceptors.request.use(
  async (config) => {
    const access_token = await AsyncStorage.getItem('access_token');
    if(access_token){
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return(config);
  },
  (err) => {
    return Promise.reject(err);
  }
)

export default spotify;
