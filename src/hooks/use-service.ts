
import { getRoomId, getServiceHistory, submitServiceForm } from "@/service/customer-service";
import type { serviceParamtype } from "@/types/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useServiceRoom = (tenantId: string) => {
    return useQuery({
        queryKey: ['tenant', tenantId],
        queryFn: () => getRoomId(tenantId),
        enabled: !!tenantId
    })
}


export const useSubmitForm = () => {
    return useMutation({
        mutationFn: submitServiceForm,
        onSuccess: () => {
            toast.success("Request submitted successfully.");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Something went wrong. Try again.");
        },
    });

}

export const useServiceHistory = ({ tenantId, status, page, limit }: serviceParamtype) => {
    return useQuery({
        queryKey: ["service-history", tenantId, status, page, limit],
        queryFn: () => getServiceHistory({ tenantId, status, page, limit }),
        enabled: !!tenantId,
    });

};