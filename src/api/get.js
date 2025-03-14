import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

// 팩토리 함수
const createGetApi = (endpoint) => {
  return (id) => {
    return axios
      .get(`/${endpoint}${id && '/' + id}`)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error('GET-ERROR. 콘솔로그를 확인해주세요.')
      })
  }
}

export const getApi = {
  book_delivery: createGetApi('book_delivery'),
  service_delivery: createGetApi('service_delivery'),
  book_disposal: createGetApi('book_disposal'),
  logistics_job: createGetApi('logistics_job'),
  cargo_usage: createGetApi('cargo_usage'),
  organizations: createGetApi('organizations'),
}
