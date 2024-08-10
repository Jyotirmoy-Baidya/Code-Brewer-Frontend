import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.example.com', // Your API base URL
    timeout: 50000, // Timeout after 10000 milliseconds (10 seconds)
});

export default axiosInstance;