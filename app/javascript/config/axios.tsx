import axios from 'axios'

export const PORT = process.env.PORT
export const HOST_NAME = process.env.HOST_NAME
const APP_HOST = 'http://' + HOST_NAME + ':' + PORT

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = APP_HOST
axios.defaults.baseURL = APP_HOST
axios.defaults.withCredentials = true

export const setting = axios
