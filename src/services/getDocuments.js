import fetcher from "../lib/fetcher";
import {
  setDocuments,
  setError,
  setLoading,
} from "../store/documents/documentSlice";

const getDocuments = () => (dispatch, getState) => {
  setLoading(true);
  fetcher(`/documents`)
    .then((data) => {
      console.log("2. getDocuments response data: ", data);
      dispatch(setDocuments(data));
    })
    .catch((error) => {
      dispatch(setError(error));
    })
    .finally(() => {
      setLoading(false);
    });
};

export default getDocuments;
