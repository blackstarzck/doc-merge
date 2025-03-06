import axios from "axios"

import { API_BASE_URL } from "../constants/config"

axios.defaults.baseURL = API_BASE_URL

// 팩토리 함수
const createPostApi = (endpoint) => {
  return (document) => {
    return axios
      .post(`/${endpoint}`, { document })
      .then((res) => {
        console.log("res.data: ", res.data)
        return res.data
      })
      .catch((error) => {
        const message = error.response.data.message[0]
        console.log("error log: ", message)
        throw new Error("콘솔로그를 확인해주세요.")
      })
  }
}

export const postApi = {
  book_delivery: createPostApi("book_delivery"),
  service_delivery: createPostApi("service_delivery"),
  book_disposal: createPostApi("book_disposal"),
  logistics_job: createPostApi("logistics_job"),
  cargo_usage: createPostApi("cargo_usage"),
}
