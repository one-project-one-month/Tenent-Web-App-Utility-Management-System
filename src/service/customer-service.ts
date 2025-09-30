import type { serviceFormValue } from "@/lib/validation"
import axios from "axios"

export const sumbitServiceForm = async (data: serviceFormValue) => {
    const id = "tenetId"
    const res = await axios.post(`/api/v1/tenants/${id}/customer-services/create`, data)
    return res.data
}