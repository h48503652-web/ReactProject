import apiClient from "./apiClient";
import type { User } from "../context/AuthContext";

interface AuthResponse {
    user: User;
    token: string;
}

export const loginRequest = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post("auth/login", { email, password });
    return response.data;
};

export const registerRequest = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post("auth/register", { name, email, password });
    return response.data;
}

export const getCurrentUser = async (): Promise<User> => {
    const response = await apiClient.get("/auth/me");
    return response.data;
}