import axios from 'axios';

axios.defaults.baseURL = '/api';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';

// Allowing cors
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// finnhub api secret key in added in the header
axios.defaults.headers.common['X-Finnhub-Secret'] = 'c1u1vo2ad3ifani3r9l0';

const apiBase = axios.create({
  baseURL: '"https://finnhub.io/v1/stocks/',
});

const apiClient = {
  get: (request, instance) =>
    (instance || axios).get(request.endpoint, request),
};

export const stockAPI = {
  get: (request) => apiClient.get(request, apiBase),
};
