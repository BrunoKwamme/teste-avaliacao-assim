import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // ajuste conforme necessário
  headers: {
    'Content-Type': 'application/json',
    // você pode colocar tokens aqui futuramente se precisar
  },
});

export default api;