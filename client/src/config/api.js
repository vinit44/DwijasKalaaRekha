const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:5000'
    : 'https://dwijaskalaarekha.onrender.com')

export default API_URL