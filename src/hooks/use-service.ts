
import { getServiceHistory } from "@/service/contract-service";
import { submitServiceForm } from "@/service/customer-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

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

// export const useServiceHistory = ({ tenantId, status }: { tenantId: string, status: string }) => {
//     const historyQuery = useQuery({
//         queryKey: ["billing-history", tenantId, status],
//         queryFn: () => getServiceHistory(tenantId!, status, { page: 1, limit: 30 }),
//         enabled: !!tenantId,
//     });

//     if (!tenantId) {
//         return {
//             history: [],
//             historyStatus: "error",
//             isLoading: false,
//             isError: true,
//             error: new Error("tenantId is required"),
//         };
//     }

//     return {
//         history: historyQuery.data ?? [],
//         historyStatus: historyQuery.status,
//         isLoading: historyQuery.isLoading,
//         isError: historyQuery.isError,
//         error: historyQuery.error || null,
//     };
// };