
export const api_url = process.env.PUBLIC_API_URL 

export const base_url = process.env.PUBLIC_API_BASE_URL

export const getToken = (): string | null => {
    if (typeof window !== "undefined") {
      // Check if it's running on the client-side
      return localStorage.getItem("token");
    }
    return null;
  };