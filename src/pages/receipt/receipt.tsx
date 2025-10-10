import BreadCrumb from '@/components/common/bread-crumb';
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react';
import { FileText } from 'lucide-react';

const exmapleFee = [
    {
        name: "Electric Fee",
        fee: 15000
    },
    {
        name: "Water Fee",
        fee: 1000
    },
    {
        name: "Wifi Fee",
        fee: 25000
    },
    {
        name: "Cleaning Fee",
        fee: 1000
    },
    {
        name: "Recent Fee",
        fee: 600000
    },
]



const Receipt = () => {
    return (
        <section className='space-y-6 my-6'>
            {/* Barcumb */}
            <BreadCrumb />
            <div className='space-y-12'>
                <h1 className='text-center text-h1 '>Receipt</h1>
                <div className='flex flex-col items-center sm:items-start'>
                    <h2 className='text-h4'>My Receipt</h2>
                    <p className='text-body-1'>
                        Hi, Jenny! Here's your Receipt, view, download, and manage all your purchase receipts.
                    </p>
                </div>
                {/* Receipt deatil card */}
                <div className='min-w-[300px] max-w-lg mx-auto '>
                    <div className='flex flex-col gap-4 border p-4 rounded-md shadow bg-white'>
                        {/* Billing date */}
                        <div className='flex flex-col gap-6'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h4 className='text-primary text-lg font-semibold'>
                                        Receipt
                                    </h4>
                                    <p>
                                        #REC_2025-10-6
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
                            <div className='w-full h-1 bg-accent' />
                            <div>
                                <p className='text-sm'>
                                    Billing from:
                                </p>
                                <h6 className="text-lg">
                                    Jenny Wilson
                                </h6>
                                <p className='text-sm'>
                                    jenny@gmail.com
                                </p>
                            </div>
                            <div className='w-full h-1 bg-accent' />

                            {
                                exmapleFee.map((field, i) => (
                                    <div key={i} className='flex items-center justify-between'>
                                        <h4> {field.name}:</h4>
                                        <p> {field.fee} MMK</p>
                                    </div>
                                ))
                            }
                            <div className='w-full h-1 bg-accent' />
                            <div className='flex items-center justify-between'>
                                <h4> Total Amount:</h4>
                                <p>642000 MMK </p>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col gap-6 border p-4 rounded-md shadow bg-white my-2'>
                        <h4>Download Options</h4>
                        <div className='flex gap-4 '>
                            <Button className='bg-primary flex-1 flex items-center text-secondary'>
                                <Download />
                                Download PDF
                            </Button>
                            <Button variant='outline' className='bg-secondary flex-1 flex items-center'>
                                <FileText />
                                Save as Text
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Receipt