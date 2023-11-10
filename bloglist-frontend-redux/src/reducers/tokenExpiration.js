import { jwtDecode } from 'jwt-decode'

const checkTokenExpirationMiddleware = store => next => action => {
  if (localStorage.getItem('loggedBloglistUser')){
    const token =
    JSON.parse(localStorage.getItem('loggedBloglistUser')) &&
    JSON.parse(localStorage.getItem('loggedBloglistUser'))['token']
    if (jwtDecode(token).exp < Date.now() / 1000) {
      next(action)
      localStorage.clear()
    }}
  next(action)
}

export default checkTokenExpirationMiddleware
