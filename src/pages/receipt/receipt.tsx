import { Button } from '@/components/ui/button'
import React from 'react'

const DataRow = () => {
    return (
        <div className='flex items-center justify-between gap-2 '>
            <h4 className='font-medium'>
                data title
            </h4>
            <p>
                data value
            </p>
        </div>
    )
}

const Receipt = () => {
    return (
        <section className='space-y-6 my-6'>
            {/* Barcumb */}
            <div className='flex gap-1 '>
                <div>

                    My-billing
                </div>

                <div>
                    billing history
                </div>
                <div>

                    Receipt
                </div>
            </div>
            <div className='space-y-10'>
                <h1 className='text-center text-h1 '>Receipt</h1>
                <div>
                    <h2 className='text-h4'>My Receipt</h2>
                    <p className='text-body-1'>
                        Hi, Jenny! Here's your Receipt, view, download, and manage all your purchase receipts.
                    </p>
                </div>
                {/* Receipt deatil card */}
                <div className='w-lg mx-auto px-4 py-6 rounded-lg shadow-md border '>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between gap-2'>
                            <div>
                                <h4 className='text-primary text-lg font-semibold'>
                                    Receipt
                                </h4>
                                <p>
                                    #Efo0EFefn
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
                        {
                            Array(10).fill(null).map((_, i) => (
                                <DataRow key={i} />
                            ))
                        }

                    </div>
                    <div className='my-4 space-y-2'>
                        <h4>Download Options</h4>
                        <div className='flex gap-4 '>
                            <Button className='bg-primary flex-1'>
                                Download pdf
                            </Button>
                            <Button className='bg-secondary flex-1'>
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