import axios from "axios"

export const config = {
    url:process.env.REACT_APP_URL,
    headers:{},
    endpoints: {
        tags: {
            base: "/tags_models",
            types: {
                vit: `${config.endpoints.tags.base}/vit`,
                clip: `${config.endpoints.tags.base}/clip`,
                intersection: `${config.endpoints.tags.base}/combined/intersection`,
                union: `${config.endpoints.tags.base}/combined/union`,
            }
        } ,
        search: "/search"
    }
}


export const apiClient = axios.create({
    baseURL: config.url,
    headers: config.headers
});