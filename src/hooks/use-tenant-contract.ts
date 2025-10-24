import { getTenantContractService } from "@/service/contract-service";
import { useQuery } from "@tanstack/react-query";

export const useTenantContractQuery = (tenantId: string) => {
  return useQuery({
    queryKey: ["tenant-contract", tenantId],
    queryFn: async () => {
      const { content } = await getTenantContractService(tenantId);
      return content;
    },
    enabled: !!tenantId, // prevents query if tenantId is undefined
  });
};
