import apiClient from "./api-client";
import type { ApiResponse } from "@/types/api";
import type { Contract } from "@/types/contract";

export const getTenantContractService = async (
  tenantId: string
): Promise<ApiResponse<Contract>> => {
  const { data } = await apiClient.get(`/tenants/${tenantId}/contracts`);

  if (!data.success) {
    throw new Error(data.message);
  }

  const contract = data.content.data;
  return { ...data, content: contract };
};

export const getServiceHistory = async (tenantId: string, status: "Pending" | "Ongoing" | "Resolved") => {
  const { data } = await apiClient.get(`/tenants/${tenantId}/customer-services/history/${status}`);

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
}
