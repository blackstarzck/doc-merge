import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_API_URL

// 팩토리 함수
const createPostApi = (endpoint) => {
  return ({ documentId, document }) => {
    return axios
      .post(`/${endpoint}`, { document })
      .then((res) => res.data)
      .catch((error) => {
        console.log("error log: ", error)
        throw new Error("POST-ERROR. 콘솔로그를 확인해주세요.")
      })
  }
}

export const postApi = {
  book_delivery: createPostApi("book_delivery"),
  service_delivery: createPostApi("service_delivery"),
  book_disposal: createPostApi("book_disposal"),
  logistics_job: createPostApi("logistics_job"),
  cargo_usage: createPostApi("cargo_usage"),
  organizations: createPostApi("organizations"),
}
