import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized access. Please login again.");
        sessionStorage.setItem("showLoginMessage", true);
        window.location.href = "/login";
      }

      if (error.response.status === 403) {
        console.error("Forbidden access. You do not have permission.");
      }

      if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
