import axios from "axios";

export default {
    logIn: (username) => {
        return axios.get("/api/auth/" + username);
    },
    signUp: (userInfo) => {
        return axios.post("/api/auth", userInfo);
    },
    getTopics: (uid) => {
        return axios.get("/api/topics/" + uid);
    },
    saveTopic: ({ topic, uid }) => {
        return axios.post("/api/topics", { topic, uid });
    },
    saveArticle: (articleData) => {
        return axios.post("/api/articles/", articleData);
    }
}