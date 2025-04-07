import { createSlice } from '@reduxjs/toolkit'

import { LOCAL_STORAGE_FORMAT_ITEM_KEY } from '../../components/keys'
import { DEFAULT_FORMAT_ITEMS } from '../../constants/options'

const localStorageFormatItems = localStorage.getItem(LOCAL_STORAGE_FORMAT_ITEM_KEY)
const initialState = localStorageFormatItems ? JSON.parse(localStorageFormatItems)[0] : DEFAULT_FORMAT_ITEMS[0]

export const formatSlice = createSlice({
  name: 'format',
  initialState: DEFAULT_FORMAT_ITEMS[0],
  reducers: {
    setFormat: (state, action) => {
      console.log('setFormat: ', action.payload)
      return action.payload
    },
  },
})
export const { setFormat } = formatSlice.actions

export default formatSlice.reducer
