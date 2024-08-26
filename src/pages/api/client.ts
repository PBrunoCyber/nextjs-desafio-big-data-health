import axios from 'axios'

const clientAxios = axios.create({
  baseURL: 'https://fakestoreapi.com/'
})

export { clientAxios }