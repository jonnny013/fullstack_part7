import { jwtDecode } from 'jwt-decode'

const checkTokenExpiration = () => {
  if (localStorage.getItem('loggedBloglistUser')) {
    const token =
      JSON.parse(localStorage.getItem('loggedBloglistUser')) &&
      JSON.parse(localStorage.getItem('loggedBloglistUser'))['token']
    if (jwtDecode(token).exp < Date.now() / 1000) {
      localStorage.clear()
    }
  }
}

export default checkTokenExpiration
