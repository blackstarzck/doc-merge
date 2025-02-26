import fetcher from "../lib/fetcher"
import {
  setError,
  setLoading,
  setOrganizations,
} from "../store/organizations/organizationsSlice"

const getOrganizations = () => (dispatch, getState) => {
  setLoading(true)
  fetcher(`/organizations`)
    .then((data) => {
      dispatch(setOrganizations(data))
    })
    .catch((error) => {
      dispatch(setError(error))
    })
    .finally(() => {
      setLoading(false)
    })
}

export default getOrganizations
