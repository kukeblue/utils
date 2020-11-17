import { getObCache, setObCache } from "./cache";
import axios from 'axios'

export  const request = async ({url, data, cache, method}) => {

    const user = getObCache('user') || {}
    if(false && getObCache(url)) {
        return getObCache(url);
    }
    try{
        const res = await axios({
            headers: {
                'Content-Type': 'application/json',
                'Auth': user.token  
            },
            method: method || 'post',
            url,
            data,
            transformRequest: [function (data, headers) {
                // Do whatever you want to transform the data
                if(!data) return data;
                Object.keys(data).forEach(key=>{
                    if(data[key] === undefined || data[key] === null) {
                        delete data[key]
                    }
                })
                return JSON.stringify(data);
            }],
        });
        console.log(`【request】 url ${url}`, data, res.data)
        if(res.data && res.data.status === 0) {
            setObCache(url, res.data)
        }
        return res.data

    }catch(error) {
        console.error(error)
        return {}
    }
}