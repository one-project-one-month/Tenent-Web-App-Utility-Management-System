import {
	getTenantService,
	updatePasswordService,
	updateProfileService,
} from "@/service/profile-service";
import type {
	UpdatePasswordPayload,
	updateProfilePayload,
} from "@/types/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTenantQuery = (tenant_id: string) => {
	const tenantQuery = useQuery({
		queryKey: ["tenant", tenant_id],
		queryFn: () => getTenantService(tenant_id),
		enabled: !!tenant_id,
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
		nrc: tenantQuery.data.content.nrc,
		roomId: tenantQuery.data.content.roomId,
		user: {
			role: tenantQuery.data.content.user?.role,
			isActive: tenantQuery.data.content.user?.isActive,
			createdAt: tenantQuery.data.content.user?.createdAt,
			updatedAt: tenantQuery.data.content.user?.updatedAt,
		}
	};

	return {
		tenant: tenantData,
		isLoading: tenantQuery.isLoading,
		isError: tenantQuery.isError,
		error: tenantQuery.error ?? null,
	};
};

export const useUpdateProfileQuery = (tenant_id: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: updateProfilePayload) =>
			updateProfileService(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tenant", tenant_id] });
			toast.success("Profile updated successfully.");
		},
		onError: (error: Error) => {
			toast.error(
				error.message ||
					"Something went wrong with profile udpate. Try again."
			);
		},
	});
};

export const useUpdatePasswordQuery = (tenantId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: UpdatePasswordPayload) =>
			updatePasswordService(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tenant", tenantId] });
			// toast.success("Password updated successfully.");
			enabled: !!tenantId;
		},
		onError: (error: Error) => {
			toast.error(
				error.message ||
					"Something went wrong with password udpate. Try again."
			);
		},
	});
};
