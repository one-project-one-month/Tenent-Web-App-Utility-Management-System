import { Button } from '@/components/ui/button'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Download } from 'lucide-react';
import { FileText } from 'lucide-react';



const Receipt = () => {
    return (
        <section className='space-y-6 my-6'>
            {/* Barcumb */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/my-billing">My Billing</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/my-billing/billing-history">Billing History</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className='text-primary'>Receipt</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='space-y-12'>
                <h1 className='text-center text-h1 '>Receipt</h1>
                <div>
                    <h2 className='text-h4'>My Receipt</h2>
                    <p className='text-body-1'>
                        Hi, Jenny! Here's your Receipt, view, download, and manage all your purchase receipts.
                    </p>
                </div>
                {/* Receipt deatil card */}
                <div className='w-lg mx-auto '>
                    <div className='flex flex-col gap-4 border p-4 rounded-md shadow bg-white'>
                        {/* Billing date */}
                        <div className='flex justify-between gap-2 border-b py-1'>
                            <div>
                                <h4 className='text-primary text-lg font-semibold'>
                                    Receipt
                                </h4>
                                <p>
                                    #Rec-007
                                </p>
                            </div>

                            <div className='flex flex-col  '>
                                <h4 className='text-end'>
                                    Date
                                </h4>
                                <span>
                                    October 8  2025
                                </span>
                            </div>
                        </div>
                        <div className=' border-b py-1'>
                            <p>
                                Billing from:
                            </p>
                            <h6 className="text-body-1">
                                Jenny Wilson
                            </h6>
                            <p className='text-body-2'>
                                jenny@gmail.com
                            </p>
                        </div>

                        {
                            Array(10).fill(null).map((_, i) => (
                                <div key={i} className='flex items-center justify-between gap-2 '>
                                    <h4 className='font-medium'>
                                        data title {i}
                                    </h4>
                                    <p>
                                        0000{i} MMK
                                    </p>
                                </div>
                            ))
                        }

                    </div>
                    <div className='flex flex-col gap-4 border p-4 rounded-md shadow bg-white my-2'>
                        <h4>Download Options</h4>
                        <div className='flex gap-4 '>
                            <Button className='bg-primary flex-1 flex items-center text-secondary'>
                                <Download />
                                Download pdf
                            </Button>
                            <Button className='bg-secondary flex-1 flex items-center'>
                                <FileText />
                                Save as text
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Receipt