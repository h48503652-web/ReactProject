import apiClient from "./apiClient";

 export const getUsers = async () => {
    const response = await apiClient.get("/users");
    return response.data;
}
 
 export const getUserById = async (id: number) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
}


    export const adminCreateUser = async (userData: { name: string; email: string; password: string; role: string }) => {
    const response = await apiClient.post("/users", userData);
    return response.data;
}

