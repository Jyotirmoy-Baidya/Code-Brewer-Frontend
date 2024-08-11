import axios from 'axios';

const axiosInstance = axios.create({
    timeout: 10000, // Timeout after 10000 milliseconds (10 seconds)
});

export default axiosInstance;