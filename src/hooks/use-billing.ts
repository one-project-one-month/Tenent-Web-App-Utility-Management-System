import {useQuery} from "@tanstack/react-query";
import {getHistoryBill} from "@/service/billing-service";

export const useBillingData = (tenantId?: string) => {
    const historyQuery = useQuery({
        queryKey: ["billing-history", tenantId],
        queryFn: () => getHistoryBill(tenantId!, {limit: 10}),
        enabled: !!tenantId,
    });

    if (!tenantId) {
        return {
            history: [],
            isLoading: false,
            isError: true,
            error: new Error("tenantId is required"),
        };
    }

    return {
        history: historyQuery.data?.data ?? [],
        isLoading: historyQuery.isLoading,
        isError: historyQuery.isError,
        error: historyQuery.error ?? null,
    };
};