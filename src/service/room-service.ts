import { type ApiResponse } from "@/types/api";
import apiClient from "./api-client"
import type { Room } from "@/types/contract";

export const getRoomByIdService = async (tenant_id: string) => {
  const response = await apiClient.get<ApiResponse<Room>>(`/tenants/${tenant_id}/room`);

  if (!response.data.success) {
    throw new Error(response.data.message || "Fetch room failed");
  }
  
  return response.data;
}