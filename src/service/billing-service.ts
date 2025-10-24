import apiClient from "@/service/api-client";
import type { Bill } from "@/types/bill";

interface ApiResponse {
  success: boolean;
  message: string;
  content: {
    data: Bill[];
    meta: {
      total: number;
      currentPage: number;
      lastPage: number;
      perPage: number;
    };
    links: {
      next: string | null;
      prev: string | null;
    };
  };
  status: number;
}

interface PaginationParams {
  page?: number;
  limit?: number;
}

export const getHistoryBill = async (
  tenantId: string,
  params: PaginationParams = {}
): Promise<Bill[]> => {
  const response = await apiClient.get<ApiResponse>(
    `/tenants/${tenantId}/bills/history`,
    {
      params: {
        page: params.page || 1,
        limit: params.limit || 100,
      },
    }
  );

  return response.data.content?.data ?? [];
};
