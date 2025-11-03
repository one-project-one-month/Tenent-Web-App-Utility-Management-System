import type { ApiResponse } from "@/types/api";
import apiClient from "./api-client"
import type { Tenant, UpdatePasswordPayload } from "@/types/tenant";


export const getTenantService = async (tenant_id: string): Promise<ApiResponse<Tenant>> => {
  const response = await apiClient.get<ApiResponse<Tenant>>(`/tenants/${tenant_id}`);

  if (!response.data.success) {
    throw new Error(response.data.message || "Fetch tenant failed");
  }
  
  return response.data;

}

export const updatePasswordService = async (payload: UpdatePasswordPayload): Promise<ApiResponse<Tenant>> => {
  const { data } = await apiClient.put(`/tenants/${payload.userId}/update-password`, payload);

  return data;
}