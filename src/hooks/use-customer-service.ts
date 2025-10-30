import { fetchServiceHistory } from "@/service/customer-service"
import { useQuery } from "@tanstack/react-query"

export const useFetchCustomerServices = (tenantId: number) => {
    return useQuery({
        queryKey: ['customer-services'],
        queryFn: () => fetchServiceHistory(tenantId),
        enabled: !!tenantId,
    })
}