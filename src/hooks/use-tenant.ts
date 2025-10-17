import { getTenantService } from "@/service/tenant-service";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTenantQuery = (tenant_id: string | undefined) => {
	return useQuery({
		queryKey: ["tenant"],
		queryFn: async () => {
      if (!tenant_id) {
        toast.error("Tenant id is missing");
        return {}
      }

      const { content } = await getTenantService(tenant_id)

      return content;
    },  
	});
};
