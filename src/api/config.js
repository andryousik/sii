import axios from "axios"

export const config = {
    url:process.env.REACT_APP_URL,
    headers:{},
    endpoints: {
        tags: "/tags_models",
        search: "/search"
    }
}


export const apiClient = axios.create({
    baseURL: config.url,
    headers: config.headers
});