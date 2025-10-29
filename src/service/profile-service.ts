import type { ApiResponse } from "@/types/api";
import apiClient from "./api-client"
import type { Tenant, UpdatePasswordPayload } from "@/types/tenant";


export const getTenantService = async (tenant_id: string): Promise<ApiResponse<Tenant>> => {
  const { data } = await apiClient.get(`/tenants/${tenant_id}`);

  if (!data.success) {
    throw new Error(data.message);
  }

  const { id, name, email, phoneNo, emergency_no, room } = data.content.tenant;
  const { roomNo } = room;

  // Create a new object with only the required fields
  const content = {
    id,
    name,
    email,
    phoneNo,
    emergency_no,
    roomNo
  };

  return {...data, content };
}

export const updatePasswordService = async (payload: UpdatePasswordPayload): Promise<ApiResponse<Tenant>> => {
  const { data } = await apiClient.put(`/tenants/${payload.userId}/update-password`, payload);

  return data;
}