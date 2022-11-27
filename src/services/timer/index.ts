import axios from "axios"

// 创建axios实例
const instance = axios.create({
    // 基本请求路径的抽取
    baseURL: "http://43.143.168.5:8092",
    // 这个时间是你每次请求的过期时间，这次请求认为20秒之后这个请求就是失败的
    timeout: 20000
})

instance.interceptors.request.use(
    config => {
        // 避免对get请求参数的特殊字符进行转译
        if (config.method != 'get' || !config.params) {
            return config;
        }

        let url = config.url;
        url += '?';
        let keys = Object.keys(config.params);
        for (let key of keys) {
            // key对应的value无值，不进行拼接
            if (!config.params[key]) {
                continue
            }
            url += `${key}=${encodeURIComponent(config.params[key])}&`;
        }
        // 去掉最后一个 &
        url = url?.substring(0, url.length - 1);
        config.url=url;
        config.params = {}
        return config
    },
    error => {
        Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(res => {
    return res.data
}, err => {
    return Promise.reject(err)
})

export default instance