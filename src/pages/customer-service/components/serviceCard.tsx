import StatusBadge from "@/components/common/status-badge"
import { Badge } from "@/components/ui/badge"
import type { ServiceStatus, ServiceType } from "@/types/service"

type ServiceCardProp = {
    services: ServiceType[]
}

const priorityToVariant = {
    High: "default",
    Medium: "outline",
    Low: "secondary",
} as const

const ServiceCard = ({ services }: ServiceCardProp) => {
    return (
        <div className="w-full space-y-4">
            {
                services?.map((service) => (
                    <div
                        key={service.id}
                        className=" border-b p-3  space-y-2 " >
                        <div className="flex justify-between items-start md:items-center gap-2">
                            <div className="flex flex-col sm:flex-row gap-2 ">
                                <p className=" font-semibold">{service.category}</p>
                                <div className="flex items-center gap-2">

                                    <StatusBadge
                                        className="px-2 py-1 rounded-sm"
                                        status={service.status as ServiceStatus}
                                    />
                                    <Badge
                                        className="text-badge-text rounded-sm "
                                        variant={priorityToVariant[service.priorityLevel]}
                                    >
                                        {service.priorityLevel}
                                    </Badge>
                                </div>
                            </div>
                            <p className=" text-gray-700">{new Date(service.issuedDate).toLocaleDateString()}</p>
                        </div>
                        <div className="bg-background rounded-sm px-2 py-3 mb-2">
                            <p className=" text-slate-500 wrap-anywhere whitespace-pre-wrap">
                                {service.description}
                            </p>
                        </div>

                    </div>
                ))
            }
        </div>



    )
}

export default ServiceCard