import axios from 'axios'

const api = axios.create({
    baseURL: 'https://shawandparterns-test-api.herokuapp.com/api/'
})

export default api