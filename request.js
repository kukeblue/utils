import { getObCache, setObCache } from "./cache";
import axios from 'axios'

export const request = async({ url, data, cache, method }) => {

    const user = getObCache('user') || {}
    if (false && getObCache(url)) {
        return getObCache(url);
    }
    try {
        const res = await axios({
            headers: {
                'Content-Type': 'application/json',
                'Auth': user.token
            },
            method: method || 'post',
            url,
            data,
            transformRequest: [function(data, headers) {
                // Do whatever you want to transform the data
                if (!data) return data;
                Object.keys(data).forEach(key => {
                    if (data[key] === undefined || data[key] === null) {
                        delete data[key]
                    }
                })
                return JSON.stringify(data);
            }],
        }).catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });;
        console.log(`【request】 url ${url}`, data, res.data)
        if (res.data && res.data.status === 0) {
            setObCache(url, res.data)
        }
        return res.data

    } catch (error) {
        console.error(error)
        return {}
    }
}