import axios from "axios";

export default {
    signup: (userInfo) => {
        axios.post("/api/auth", userInfo);
    }
}