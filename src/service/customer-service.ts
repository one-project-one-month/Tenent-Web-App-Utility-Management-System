import type { serviceFormValue } from "@/lib/validation"
import apiClient from "./api-client"

export const submitServiceForm = async (
    { data, tenantId, roomId }: { data: serviceFormValue, tenantId: string, roomId: string }


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

    const res = await apiClient.post(`/api/v1/tenants/${tenantId}/customer-services/create`, formData)
    return res.data

}