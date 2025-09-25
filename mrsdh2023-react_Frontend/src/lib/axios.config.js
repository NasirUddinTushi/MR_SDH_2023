import axios from "axios";

// Helper to build baseURL from Vite env with a safe fallback.
const buildApiBase = () => {
  const raw = import.meta.env.VITE_API_BASE_URL;
  console.log("Raw env variable:", raw); // Debug log
  console.log("All env variables:", import.meta.env); // Debug log
  
  // If the VITE_API_BASE_URL is set, use it directly
  if (raw && typeof raw === "string" && raw.length > 0) {
    // Ensure the URL ends with a slash for proper endpoint concatenation
    return raw.endsWith("/") ? raw : `${raw}/`;
  }
  // Fallback to a relative path (will be relative to current origin)
  console.log("Using fallback URL"); // Debug log
  return "/";
};

const baseURL = buildApiBase();
console.log("API Base URL:", baseURL); // Debug log

const axiosPublic = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // Increased timeout for better reliability
});

const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // Increased timeout for better reliability
});

// Request interceptor for private axios to add auth token
axiosPrivate.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosPrivate.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login page
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

export { axiosPrivate, axiosPublic };
