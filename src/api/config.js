import axios from "axios"


export const createConfig = () => {
    const baseTags = "/tags_models";

    return {
        url: process.env.REACT_APP_URL,
        headers: {},
        endpoints: {
            tags: {
                base: baseTags,
                types: {
                    vit: `${baseTags}/vit`,
                    clip: `${baseTags}/clip`,
                    intersection: `${baseTags}/combined/intersection`,
                    union: `${baseTags}/combined/union`,
                },
            },
            search: "/search",
        },
    };
};

export const config = createConfig();


export const apiClient = axios.create({
    baseURL: config.url,
    headers: config.headers
});