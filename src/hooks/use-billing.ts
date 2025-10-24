import { useQuery } from "@tanstack/react-query";
import { getHistoryBill } from "@/service/billing-service";

export const useBillingData = (tenantId?: string) => {
  const historyQuery = useQuery({
    queryKey: ["billing-history", tenantId],
    queryFn: () => getHistoryBill(tenantId!, { page: 1, limit: 30 }),
    enabled: !!tenantId,
  });

  if (!tenantId) {
    return {
      history: [],
      historyStatus: "error",
      isLoading: false,
      isError: true,
      error: new Error("tenantId is required"),
    };
  }

  return {
    history: historyQuery.data ?? [],
    historyStatus: historyQuery.status,
    isLoading: historyQuery.isLoading,
    isError: historyQuery.isError,
    error: historyQuery.error || null,
  };
};
