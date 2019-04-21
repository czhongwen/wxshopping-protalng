import axios from 'axios';

const instance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': "application/json;charset=utf-8"
  }
});
  export default {
    post(url, data,) {
      return instance.post(url, data);
    },
    get (url, data) {
      return instance.get(url, data);
    }
  }
