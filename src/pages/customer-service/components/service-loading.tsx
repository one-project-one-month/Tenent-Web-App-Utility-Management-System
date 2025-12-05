import { Skeleton } from "@/components/ui/skeleton"

const ServiceLoading = () => {
    return (
        <>
            {
                Array(10).fill(null).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between items-start md:items-center">
                            <div className="flex flex-col md:flex-row gap-1">
                                <Skeleton className="h-5 w-24 rounded-sm bg-neutral-300" />
                                <div className="flex gap-1">
                                    <Skeleton className="h-5 w-12 rounded-sm bg-neutral-300" />
                                    <Skeleton className="h-5 w-11 rounded-sm bg-neutral-300" />
                                </div>
                            </div>
                            <Skeleton className="h-5 w-20 rounded-sm bg-neutral-300" />
                        </div>
                        <Skeleton className="h-24 w-full rounded-sm bg-neutral-300" />
                        <Skeleton className="h-0.5 w-full rounded-sm bg-neutral-300 mt-4" />

                    </div>
                ))
            }
        </>


    )
}

export default ServiceLoading