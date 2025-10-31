import type { ServiceStatus, ServiceType } from "@/types/service"
import StatusBadge from "../common/status-badge"
import { Badge } from "../ui/badge"



type ServiceCardProp = {
    service: ServiceType
}

const priorityToVariant = {
    High: "default",
    Medium: "outline",
    Low: "secondary",
} as const


const ServiceCard = ({ service }: ServiceCardProp) => {
    return (
        <div
            className=" border p-3 rounded-md shadow-sm space-y-4 " >
            <div className="flex justify-between items-start md:items-center gap-2">
                <div className="flex flex-col sm:flex-row gap-2 ">
                    <p className=" font-semibold">{service.category}</p>
                    <div className="flex items-center gap-2">

                        <StatusBadge
                            className="px-2 py-1"
                            status={service.status as ServiceStatus}
                        />
                        <Badge
                            className="text-badge-text"
                            variant={priorityToVariant[service.priorityLevel]}
                        >
                            {service.priorityLevel}
                        </Badge>
                    </div>
                </div>
                <p className=" text-gray-700">{new Date(service.issuedDate).toLocaleDateString()}</p>
            </div>
            <div className="bg-background rounded-sm px-2 py-4 mb-2">

                <p className=" text-slate-500 text-sm text-wrap">
                    {service.description}
                </p>
            </div>

        </div>
    )
}

export default ServiceCard