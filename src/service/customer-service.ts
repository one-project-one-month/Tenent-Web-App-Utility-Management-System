
import type { ServiceType, ApiResponse, serviceParamtype, submitFormType } from "@/types/service";
import type { ApiResponse as ApiFetchResponse } from "@/types/api";
import apiClient from "./api-client"
import type { Tenant } from "@/types/tenant";



//Get Room Id from teanant
export const getRoomId = async (tenantId: string) => {
    const { data } = await apiClient.get<ApiFetchResponse<Tenant>>(`/tenants/${tenantId}`)
    return data.content.roomId
}

//submit service form
export const submitServiceForm = async (
    { data, tenantId, roomId }: submitFormType
) => {
    if (!tenantId) {
        throw new Error("Tenant Id is required.")
    }
    if (!roomId) {
        throw new Error("Room Id is required.")
    }
    const issuedDate = new Date(Date.now()).toLocaleDateString()

    const formData = { ...data, roomId, status: "Pending", issuedDate }
    const res = await apiClient.post<ApiResponse<ServiceType>>
        (`/tenants/${tenantId}/customer-services/create`, formData)
    return res.data.content

}


export const getServiceHistory = async (
    { tenantId, params }: serviceParamtype
) => {
    if (!tenantId) {
        throw new Error("Tenant Id is required.")
    }

    const { data } = await apiClient.get<ApiResponse<ServiceType[]>>(`/tenants/${tenantId}/customer-services/history?`,
        {
            params: {
                page: params?.page || 1,
                limit: params?.limit || 10,
            }
        });

    if (!data.success) {
        throw new Error(data.message);
    }

    return data.content;
}
