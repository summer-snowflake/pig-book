import axios from 'axios'

export const SERVER_PORT = process.env.REACT_APP_SERVER_PORT
export const WDS_SOCKET_HOST = process.env.WDS_SOCKET_HOST

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://' + WDS_SOCKET_HOST + ':' + SERVER_PORT
axios.defaults.baseURL = 'http://' + WDS_SOCKET_HOST + ':' + SERVER_PORT
axios.defaults.withCredentials = true

export const setting = axios
