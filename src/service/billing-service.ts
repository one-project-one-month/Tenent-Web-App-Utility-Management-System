import apiClient from "@/service/api-client";
import type {Bill} from "@/types/bill";

interface ApiContent {
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
}

interface ApiResponse {
    success: boolean;
    message: string;
    content: ApiContent;
    status: number;
}

export const getHistoryBill = async (
    tenantId: string,
    params: { limit?: number } = {}
): Promise<{ data: Bill[] }> => {
    const response = await apiClient.get<ApiResponse>(
        `/tenants/${tenantId}/bills/history`,
        {
            params: {
                limit: params.limit ?? 10,
            },
        }
    );

    if (!response.data.success) {
        throw new Error(response.data.message || "Failed");
    }

    return response.data.content;
};