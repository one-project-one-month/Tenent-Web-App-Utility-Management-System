import apiClient from "./api-client";
import type {Bill} from "@/types/bill";

interface ApiContent  {
    data: Bill[];
    meta: {
        total: number;
        currentPage: number;
        lastPage: number;
        perPage: number;
    };
    links:{
        next: string | null;
        prev: string | null;
    }
}

interface ApiResponse {
    success: boolean;
    message: string;
    content: ApiContent;
    status: number;
}

export const getMonthlyUsage = async (tenantId: string): Promise<ApiContent> => {
  const { data } = await apiClient.get<ApiResponse>(`/tenants/${tenantId}/bills/history`);

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.content;
};
