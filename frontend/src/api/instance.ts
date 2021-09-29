import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5002/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  // withCredentials: true,
});

export {
  instance as default,
};