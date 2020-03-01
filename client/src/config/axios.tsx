import axios from 'axios'

export const SERVER_PORT = process.env.REACT_APP_SERVER_PORT
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'http://localhost:' + SERVER_PORT

export const setting = axios