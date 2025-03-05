import axios from "axios"

import { API_BASE_URL } from "../constants/config"

axios.defaults.baseURL = API_BASE_URL

// 팩토리 함수
const createDeleteApi = (endpoint) => {
  return (ids) => {
    console.log("deleteApi: ", ids)
    return axios.delete(`/${endpoint}/${ids.join(",")}`).then((res) => res.data)
  }
}

export const deleteApi = {
  book_delivery: createDeleteApi("book_delivery"),
  service_delivery: createDeleteApi("service_delivery"),
  book_disposal: createDeleteApi("book_disposal"),
  logistics_job: createDeleteApi("logistics_job"),
  cargo_usage: createDeleteApi("cargo_usage"),
}
