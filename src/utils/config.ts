import { User } from "@/types";

export const api_url = process.env.PUBLIC_API_URL;

export const base_url = process.env.PUBLIC_API_BASE_URL;

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    // Check if it's running on the client-side
    return localStorage.getItem("token");
  }
  return null;
};

export const getUser = (): User | null => {
  if (typeof window !== "undefined") {
    // Check if it's running on the client-side
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user: User = JSON.parse(userData);
        return user;
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        return null;
      }
    }
  }
  return null;
};
