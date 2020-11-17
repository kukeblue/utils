const { mp_setCache } = require("./wechatmp/cache");


export const setObCache = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getObCache = (key) => {
    localStorage.getItem(key, JSON.parse(value))
}