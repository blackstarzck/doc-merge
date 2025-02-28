import axios from "axios"

import { API_BASE_URL } from "../constants/config"

axios.defaults.baseURL = API_BASE_URL

// 팩토리 함수
const createPostApi = (endpoint) => {
  return (payload) => {
    const { document } = payload
    return axios.post(`/${endpoint}`, { document }).then((res) => res.data)
  }
}

export const postApi = {
  book_delivery: createPostApi("book_delivery"),
  service_delivery: createPostApi("service_delivery"),
  book_disposal: createPostApi("book_disposal"),
  logistics_job: createPostApi("logistics_job"),
  cargo_usage: createPostApi("cargo_usage"),
}
