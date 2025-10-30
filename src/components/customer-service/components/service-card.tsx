import StatusBadge from "@/components/common/status-badge"
import { Badge } from "@/components/ui/badge"
import type { CustomerService } from "@/types/customer-service"

type serviceProps = {
    service: CustomerService
}

const priorityToVariant = {
    High: "default",
    Medium: "outline",
    Low: "secondary",
} as const

const ServiceCard = ({ service }: serviceProps) => {
    return (
        <div
            className=" flex flex-col gap-3 border-b border-gray-500 "
        >
            <div className="flex justify-between items-center gap-2">
                <div className="flex gap-2">
                    <p className=" font-semibold">{service.category}</p>
                    <StatusBadge
                        className="px-2 py-1"
                        status={service.status}
                    />
                    <Badge
                        className="text-badge-text"
                        variant={priorityToVariant[service.priorityLevel]}
                    >
                        {service.priorityLevel}
                    </Badge>
                </div>
                <p className=" text-gray-700">{new Date(service.issuedDate).toLocaleDateString()}</p>
            </div>
            <p className="text-balance text-slate-600 text-sm bg-background rounded-sm px-2 py-4 mb-2 ">
                {service.description}{" "}
            </p>
        </div>
    )
}

export default ServiceCard