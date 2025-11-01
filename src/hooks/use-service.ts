import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getRoomId, getServiceHistory, submitServiceForm } from "@/service/customer-service";
import type { serviceParamtype } from "@/types/service";
import { toast } from "sonner";

const queryClient = new QueryClient()

//get roomId from tenant
export const useServiceRoom = (tenantId: string) => {
    return useQuery({
        queryKey: ['tenant', tenantId],
        queryFn: () => getRoomId(tenantId),
        enabled: !!tenantId
    })
}
//submit form 
export const useSubmitForm = () => {
    return useMutation({
        mutationFn: submitServiceForm,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service-history'] });
            toast.success("Request submitted successfully.");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Something went wrong. Try again.");
        },
    });

}
//get service history
export const useServiceHistory = ({ tenantId, status, page, limit }: serviceParamtype) => {
    return useQuery({
        queryKey: ["service-history", tenantId, status, page, limit],
        queryFn: () => getServiceHistory({ tenantId, status, page, limit }),
        enabled: !!tenantId,
    });

};