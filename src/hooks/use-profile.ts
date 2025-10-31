import { getTenantService, updatePasswordService } from "@/service/profile-service";
import type { UpdatePasswordPayload } from "@/types/tenant";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTenantQuery = (tenant_id: string) => {
	return useQuery({
		queryKey: ["tenant"],
		queryFn: async () => {
      const { content } = await getTenantService(tenant_id);

      return content;
    },
	});
};

export const usePasswordUpdateQuery = () => {
	return useMutation({
		mutationFn: (payload: UpdatePasswordPayload) => updatePasswordService(payload),
	})
}
