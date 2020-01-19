import axios from 'axios';
import { API_ENDPOINT } from 'react-native-dotenv';

const api = axios.create({
  baseURL: API_ENDPOINT
});

export default api;
