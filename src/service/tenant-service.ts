import type { ApiResponse } from "@/types/api";
import apiClient from "./api-client"
import type { Tenant } from "@/types/tenant";


export const getTenantService = async (tenant_id: string): Promise<ApiResponse<Tenant>> => {
  const { data } = await apiClient.get(`/tenants/${tenant_id}`);

  if (!data.success) {
    throw new Error(data.message);
  }

  const { id, name, email, phone_no, emergency_no, room } = data.content.tenant;
  const { room_no } = room;

  // Create a new object with only the required fields
  const content = {
    id,
    name,
    email,
    phone_no,
    emergency_no,
    room_no
  };

  return {...data, content };
}