import axios from 'axios'

const clientAxios = axios.create({
  baseURL: `https://nextjs-desafio-big-data-health.vercel.app/api/`
})

export { clientAxios }
