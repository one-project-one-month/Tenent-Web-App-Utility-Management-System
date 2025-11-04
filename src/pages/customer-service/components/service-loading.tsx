import { Skeleton } from "@/components/ui/skeleton"

const ServiceLoading = () => {
    return (
        <div className=" w-full space-y-6 border border-gray-300  rounded-sm shadow-sm p-5 bg-card">
            <div className="space-y-2">
                <Skeleton className="h-6 w-60  bg-neutral-300" />
                <Skeleton className="h-6 w-60 bg-neutral-300" />

            </div>
            {
                Array(10).fill(null).map((_, i) => (
                    <Skeleton className="h-40 w-full bg-neutral-300" key={i} />
                ))
            }

        </div>
    )
}

export default ServiceLoading