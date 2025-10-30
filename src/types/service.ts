import type { serviceFormValue } from "@/lib/validation"

export type servicePropsType = {
    tenantId: string,
    roomId: string,
}
export type submitFormType = {
    data: serviceFormValue,
    tenantId: string,
    roomId: string
}

export type serviceQueryType = {
    status?: string,
    page?: number,
    limit?: number,
}
export type serviceParamtype = {
    tenantId: string,
    params?: serviceQueryType
}

export interface ServiceType {
    "id": string,
    "description": string,
    "category": 'Complain' | 'Maintenance' | 'Other',
    "status": "Pending" | "Ongoing" | "Resolved",
    "priorityLevel": "Low" | "Medium" | "High",
    "issuedDate": Date,
    "createdAt": Date,
    "updatedAt": Date,
    "roomId": string,
    "roomNo": number,
}
export type serviceApiResponse = {
    content: {
        data: ServiceType[];
        meta: {
            total: number;
            currentPage: number;
            lastPage: number;
            perPage: number;
        };
        links: {
            next: string | null;
            prev: string | null;
        };
    }
}
