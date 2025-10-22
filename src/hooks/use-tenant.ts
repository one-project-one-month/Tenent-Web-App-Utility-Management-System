import { getTenantService } from "@/service/tenant-service";
import { useQuery } from "@tanstack/react-query";

export const useTenantQuery = (tenant_id: string) => {
	return useQuery({
		queryKey: ["tenant"],
		queryFn: async () => {
      const { content } = await getTenantService(tenant_id);

      return content;
    },
	});
};
