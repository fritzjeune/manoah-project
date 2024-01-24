import axios from "axios";

export default axios.create({
    // baseURL: "http://192.206.141.224:8088/api/v1/"
    // baseURL:  "http://192.168.100.10/api/v1"
    baseURL: "http://127.0.0.1:3010/api/v1/"
    // baseURL: process.env.REACT_APP_BACK_END_URL
})

