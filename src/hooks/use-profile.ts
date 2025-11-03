import { getTenantService, updatePasswordService } from "@/service/profile-service";
import type { UpdatePasswordPayload } from "@/types/tenant";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTenantQuery = (tenant_id: string) => {
	const tenantQuery = useQuery({
		queryKey: ["tenant"],
		queryFn: () => getTenantService(tenant_id),
	});

	if (!tenantQuery.data) {
		return {
			tenant: null,
			isLoading: true,
			isError: false,
			error: null,
		};
	}

	const tenantData = {
		id: tenantQuery.data.content.id,
		name: tenantQuery.data.content.name,
		email: tenantQuery.data.content.email,
		phNumber: tenantQuery.data.content.phNumber,
		emergencyNo: tenantQuery.data.content.emergencyNo,
		roomId: tenantQuery.data.content.roomId,
		role: tenantQuery.data.content.user.role,
		isActive: tenantQuery.data.content.user.isActive,
		createdAt: tenantQuery.data.content.user.createdAt,
		updatedAt: tenantQuery.data.content.user.updatedAt
	};

	return {
		tenant: tenantData,
		isLoading: tenantQuery.isLoading,
		isError: tenantQuery.isError,
		error: tenantQuery.error ?? null,
	}
};

export const usePasswordUpdateQuery = () => {
	return useMutation({
		mutationFn: (payload: UpdatePasswordPayload) => updatePasswordService(payload),
	})
}
