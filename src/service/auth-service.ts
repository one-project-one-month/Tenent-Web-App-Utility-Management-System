import type { LoginSchema } from "@/types/auth";
import apiClient from "./apiClient";

export const loginService = async (payload: LoginSchema) => {
  const { data } = await apiClient.post("/auth/login", payload);

  return data.content;
}

export const logoutService = async () => {
  const { data } = await apiClient.post("auth/logout");

  console.log("Logout res data: ", data);
  
  return data;
}