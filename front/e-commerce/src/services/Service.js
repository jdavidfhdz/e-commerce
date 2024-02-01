import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_BACKEND_URL;

const authHeader = () => ({
  
});

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

class Service {
  static get(path = '', params = {}) {
    return client({
      method: 'GET',
      url: path,
      params,
    });
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static delete(path = '', params = {}) {
    return client({
      method: 'DELETE',
      url: path,
      params,
      headers: { ...authHeader() },
    });
  }
}


client.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status !== 200) {
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  },
);
export { Service };
