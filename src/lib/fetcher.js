import axios from "axios"

import { API_BASE_URL } from "../constants/config"

axios.defaults.baseURL = API_BASE_URL

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default fetcher
