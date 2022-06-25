import axios from 'axios';
import { API_BASE } from '../Constants';

export default axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }  
});