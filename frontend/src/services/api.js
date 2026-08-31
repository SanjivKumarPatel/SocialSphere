import axios from 'axios'

const api = axios.create({
  baseURL : 'https://socialsphere-8bmz.onrender.com/api'
})

export default api