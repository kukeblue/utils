const { mp_setCache } = require("./wechatmp/cache");


export const setObCache = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getObCache = (key) => {
    let _ob = localStorage.getItem(key)
    if(_ob) {
        return JSON.parse(_ob)
    }
}