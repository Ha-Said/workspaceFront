import axios from "axios";

const login = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:5000/api/login", { email, password });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data?.message || "Server error");
        throw error;
    }
};
