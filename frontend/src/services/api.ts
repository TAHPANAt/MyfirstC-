import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust to your C# backend port
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
