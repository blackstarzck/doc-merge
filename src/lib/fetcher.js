import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default fetcher
