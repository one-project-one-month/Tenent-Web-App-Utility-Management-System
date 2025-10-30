
import type { serviceApiResponse, serviceParamtype, submitFormType } from "@/types/service";
import apiClient from "./api-client"



//Get Room Id from teanant
export const getRoomId = async (tenantId: string) => {
    const { data } = await apiClient.get(`/tenants/${tenantId}`)
    const roomId = data.content.data.roomId
    return roomId;
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
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("priorityLevel", data.priorityLevel);
    formData.append("status", "Pending");
    formData.append("roomId", roomId);

    const res = await apiClient.post(`/tenants/${tenantId}/customer-services/create`, formData)
    return res.data

}




export const getServiceHistory = async (
    { tenantId, params }: serviceParamtype
): Promise<serviceApiResponse> => {
    if (!tenantId) {
        throw new Error("Tenant Id is required.")
    }

    const { data } = await apiClient.get(`/tenants/${tenantId}/customer-services/history?`,
        {
            params: {
                page: params?.page || 1,
                limit: params?.limit || 10,
            }
        });

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}
