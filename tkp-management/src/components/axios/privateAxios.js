import axios from "./axios"

const privateAxios = axios.create({
    // baseURL,
    headers: {
        "Authorization": `Bearer ${window.sessionStorage.getItem("accessToken")}`,
        'Accept': "application/json",
        'Access-Control-Allow-Origin': '*/*',
        'Content-Type': 'application/json',
    }
})


export default privateAxios
