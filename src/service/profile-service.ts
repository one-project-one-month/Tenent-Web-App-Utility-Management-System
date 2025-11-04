import type { ApiResponse } from "@/types/api";
import apiClient from "./api-client"
import type { Tenant } from "@/types/tenant";
import type { UpdatePasswordPayload, updateProfilePayload } from "@/types/profile";


export const getTenantService = async (tenant_id: string) => {
  const response = await apiClient.get<ApiResponse<Tenant>>(`/tenants/${tenant_id}`);

  if (!response.data.success) {
    throw new Error(response.data.message || "Fetch tenant failed");
  }
  
  return response.data;
}

export const updateProfileService = async (payload: updateProfilePayload) => {
  const response = await apiClient.put<ApiResponse<Tenant>>(`/users/${payload.userId}`, payload);

  if (!response.data.success) {
    throw new Error(response.data.message || "Update profile failed");
  }

  return response.data;
}

export const updatePasswordService = async (payload: UpdatePasswordPayload) => {
  const response = await apiClient.put<ApiResponse<Tenant>>(`/users/${payload.userId}/update-password`, payload);

  if (!response.data.success) {
    throw new Error(response.data.message || "Update profile failed");
  }

  return response.data;
}
