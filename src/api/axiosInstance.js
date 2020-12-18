import axios from 'axios'
import {TOKEN_KEY} from '../constants'

const axiosInstance= axios.create({
  baseURL:process.env.REACT_APP_BASE_URL,
  auth:`Bearer ${localStorage.getItem(TOKEN_KEY)}`
})

export default axiosInstance