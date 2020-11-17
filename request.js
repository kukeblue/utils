import { getObCache, setObCache } from "./cache";
import axios from 'axios'

export  const request = ({url, data, cache, method}) => {
    return new Promise((resolve, reject)=>{
        const user = getObCache('user') || {}
        if(false && getObCache(url)) {
            return getObCache(url);
        }
        const res = axios({
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
        }).then(function (response) {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            console.log(`【request】 url ${url}`, data, res.data)
            if(response.data && response.data.status === 0) {
                setObCache(url, response.data)
            }
            resolve(response.data)
        }).
        catch(function (error) {
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
            reject(1)
        }).finally(()=>{
            // reject(0)
        });
       
        // return res.data
    })
    
}