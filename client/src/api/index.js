import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production'? '' : 'http://localhost:3000'
const api = axios.create({
    baseURL: `${baseURL}/api`
})
export const getAllArticles = () => api.get(`/articles`)
export const getArticleById = id => api.get(`/articles/${id}`)

export const getArticlesByQuery = query => api.get(`/articles/query/${query}`)

export const getAllVolumes = () => api.get(`/volumes/`)

export const getAllPublications = () => api.get(`/publications/`)

const apis = {
    getAllArticles,
    getArticleById,
    getArticlesByQuery,
    getAllVolumes,
    getAllPublications
}

export default apis