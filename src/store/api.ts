import axios from "axios";
const apiPath = 'http://localhost:3000/'


export function setAuthHeaders() {
    // axios.default.headers = {
    //     'accesstoken': localStorage.getItem('ai-chat-api'),
    //     'Content-Type': 'Application/json'
    // }
}

function headers() {
    if (localStorage.getItem('ai-chat-api')) {
        const config = {
            headers: {
                'accesstoken': localStorage.getItem('ai-chat-api'),
            }
        };
        return config;
    } else {
        return false;
    }
}

export function deleteAuthHeaders() {
    localStorage.removeItem('ai-chat-api');
    localStorage.removeItem('ai-chat-user');
}

export async function users() {
    try {
        let h = headers();
        if (h){
            let response = await axios.get(apiPath + `users`, h)
            if (response.status == 200) {
                return response.data.result;
            }
        }
        return [];
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function createConversation(data: any) {
    try {
        let h = headers();
        if (h){
            let response = await axios.post(apiPath + `conversations/new`, data, h)
            if (response.status == 200) {
                return response.data.result;
            }
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function getSingleConversation(id: any) {
    try {
        let h = headers();
        if (h){
            let response = await axios.get(apiPath + `conversations/` + id, h)
            if (response.status == 200) {
                return response.data.result;
            }
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function getConversation(conversationId: any) {
    try {
        let h = headers();
        if (h){
            let response = await axios.get(apiPath + `conversations/${conversationId}`, h)
            if (!!response.data.result) {
                return response.data.result;
            }
        }
        return [];
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function removeFromConversation(data: any) {
    try {
        let h = headers();
        if (h){
            let response = await axios.post(apiPath + `conversations/remove`, data, h)
            if (!!response.data.result) {
                return response.data.result;
            }
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function allConversations(id: any) {
    try {
        let h = headers();
        if (h){
            let response = await axios.get(apiPath + `conversations/user/${id}`, h)
            if (!!response.data.result) {
                return response.data.result;
            }
        }
        return [];
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function createMessage(data: any) {
    try {
        let h = headers();
        if (h){
            let response = await axios.post(apiPath + `messages/new`, data, h)
            if (response.status == 200) {
                return response.data.result;
            }
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function allMessages(conversationId: any = null) {
    try {
        let h = headers();
        if (h){
            let response = await axios.get(apiPath + `messages` + (conversationId ? `/conversation/${conversationId}` : ''), h)
            if (!!response.data.result) {
                return response.data.result;
            }
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
