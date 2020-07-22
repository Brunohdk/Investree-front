import axios from 'axios'
import enviroment from '../config/enviroment'

const api = axios.create({
    baseURL: enviroment.apiURL.investree
})

export default api