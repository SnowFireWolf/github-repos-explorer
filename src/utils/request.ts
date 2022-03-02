import axios from 'axios';



// github api
export default axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'Content-Type': 'application/json'
  }
});