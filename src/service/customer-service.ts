import type { serviceFormValue } from "@/lib/validation"
import axios from "axios"
import apiClient from "./api-client"
import type { CustomerService, ServiceStatus } from "@/types/customer-service"
import type { ApiResponse } from "@/types/pagination"

export const sumbitServiceForm = async (data: serviceFormValue) => {
    const id = "tenetId"
    const res = await axios.post(`/api/v1/tenants/${id}/customer-services/create`, data)
    return res.data

}

export const fetchServiceHistory = async(tenantId: number, status?: ServiceStatus) => {
    const response = await apiClient.get<ApiResponse<CustomerService[]>>(`tenants/${tenantId}/customer-services/history?${status && `status=${status}`}`)

    return response.data.content
}