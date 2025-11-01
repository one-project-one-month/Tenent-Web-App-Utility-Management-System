import apiClient from "./api-client"
import type { ServiceType, ApiResponse, serviceParamtype, submitFormType } from "@/types/service";
import type { ApiResponse as ApiFetchResponse } from "@/types/api";
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

    //Generate local date string
    const issuedDate = new Date(Date.now()).toLocaleDateString()

    //Add necessary fileds
    const formData = { ...data, roomId, status: "Pending", issuedDate }

    const res = await apiClient.post<ApiResponse<ServiceType>>
        (`/tenants/${tenantId}/customer-services/create`, formData)
    return res.data.content

}

// Get service history
export const getServiceHistory = async (
    { tenantId, status, page, limit }: serviceParamtype
) => {
    if (!tenantId) {
        throw new Error("Tenant Id is required.")
    }

    const { data } =
        await apiClient.get<ApiResponse<ServiceType[]>>
            (`/tenants/${tenantId}/customer-services/history?
            ${status && `status=${status}`}
            &page=${page || 1}
            &limit=${limit || 10}`);

    if (!data.success) {
        throw new Error(data.message);
    }

    return data.content;
}
