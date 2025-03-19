import { createSlice } from '@reduxjs/toolkit'

const setCookie = (name, value, days = 7) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // 만료: days일 후
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value}; ${expires}; path=/`
}

const getCookie = (name) => {
  return (
    document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1] || null
  )
}

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

const initialAccessCode = getCookie('accessCode')

export const accessSlice = createSlice({
  name: 'access',
  initialState: {
    code: initialAccessCode,
  },
  reducers: {
    setAccessCode: (state, action) => {
      state.code = action.payload

      if (action.payload) {
        setCookie('accessCode', action.payload, 1) // 7일 만료
      } else {
        deleteCookie('accessCode')
      }
    },
  },
})

export const { setAccessCode } = accessSlice.actions

export default accessSlice.reducer
