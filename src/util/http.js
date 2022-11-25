import axios from "axios";

const http = axios.create({
    baseURL: 'https://m.maizuo.com',
    timeout: 10000,
    headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16690934605459620692754433","bc":"310100"}'
    }
})

export default http