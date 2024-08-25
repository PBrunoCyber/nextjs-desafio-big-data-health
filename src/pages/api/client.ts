import axios from 'axios'

const clientAxios = axios.create({
  baseURL: `http://localhost:3000/api/` || `https://nextjs-desafio-big-data-health.vercel.app/api/`
})

export { clientAxios }