export function getAuthToken() {
    if (typeof window !== "undefined") {
        return localStorage.getItem("auth-token") || null
    }
}