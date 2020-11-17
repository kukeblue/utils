const { mp_setCache } = require("./wechatmp/cache");


export const setObCache = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getObCache = (key) => {
<<<<<<< HEAD
    localStorage.getItem(key, JSON.parse(value))
=======
    localStorage.getItem(key)
>>>>>>> a37216b409b6964a3d082e3bb2c0663f18c974a5
}