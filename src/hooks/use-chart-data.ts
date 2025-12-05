import { getMonthlyUsage } from "@/service/overview";
import { useQuery } from "@tanstack/react-query";

const useChartData = (tenantId?: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["chart-data", tenantId],
    queryFn: () => getMonthlyUsage(tenantId!),
    enabled: !!tenantId,
  });

  return {
    data: data?.data,
    isLoading: isLoading,
    isError: isError,
  };
};

export default useChartData;
