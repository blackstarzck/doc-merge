import axios from "axios";

import { API_BASE_URL } from "../constants/config";

axios.defaults.baseURL = API_BASE_URL;

// 팩토리 함수
const createGetApi = (endpoint) => {
  return () => {
    return axios.get(`/${endpoint}`).then((res) => res.data);
  };
};

export const getApi = {
  book_delivery: createGetApi("book_delivery"),
  service_delivery: createGetApi("service_delivery"),
  book_disposal: createGetApi("book_disposal"),
  logistics_job: createGetApi("logistics_job"),
  cargo_usage: createGetApi("cargo_usage"),
};
