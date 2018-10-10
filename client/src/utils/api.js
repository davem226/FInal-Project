import axios from "axios";

export default {
    logIn: (username) => {
        return axios.get("/api/auth/" + username);
    },
    signUp: (userInfo) => {
        return axios.post("/api/auth", userInfo);
    },
    getTopics: (uid) => {
        return axios.get("/api/topic/" + uid);
    }
}