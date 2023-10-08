import axios from "axios";
const apiPath = 'http://localhost:3000/'


export function setAuthHeaders() {
    // axios.default.headers = {
    //     'accesstoken': localStorage.getItem('ai-chat-api'),
    //     'Content-Type': 'Application/json'
    // }
}

function headers() {
    const config = {
        headers: {
            'accesstoken': localStorage.getItem('ai-chat-api'),
        }
    };
    return config
}

export function deleteAuthHeaders() {
    // delete axios.default.headers.accesstoken
}

export async function users() {
    try {
        let response = await axios.get(apiPath + `users`, headers())
        if (response.status == 200) {
            return response.data.result;
        }
        return [];
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function login(data: any) {
    try {
        let response = await axios.post(apiPath + `users/login`, data)
        if (response.data.status == 200) {
            localStorage.setItem("ai-chat-user", JSON.stringify(response.data.result));
            localStorage.setItem("ai-chat-api", response.data.jwt);
            return true;
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function signup(data: any) {
    try {
        let response = await axios.post(apiPath + `users/register`, data)
        if (response.data.status == 200) {
            return true;
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export default {
    setAuthHeaders,
    deleteAuthHeaders,
    login,
    signup,
    users
};
