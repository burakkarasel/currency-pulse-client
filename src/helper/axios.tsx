import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_REACT_API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.defaults.withCredentials = true;
