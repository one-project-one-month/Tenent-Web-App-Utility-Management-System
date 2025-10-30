export interface Bill {
    id: number;
    roomId: string;
    rentalFee: string;
    electricityFee: string;
    waterFee: string;
    fineFee: string;
    serviceFee: string;
    groundFee: string;
    carParkingFee: string;
    wifiFee: string;
    totalAmount: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;

    totalUnit?: {
        id: number;
        billId: number;
        electricityUnits: string;
        waterUnits: string;
        tenantName: string;
        roomNo: number;
        totalAmount: string;
    };

    tenant?: {
        id: number;
        roomId: string;
        name: string;
        nrc: string;
        email: string;
        phNumber: string;
        emergencyNo: string;
    };

    room?: {
        id: string;
        roomNo: number;
        floor: number;
        dimension: string;
        noOfBedRoom: number;
        status: string;
        sellingPrice: string;
        maxNoOfPeople: number;
        description: string;
        createdAt: string;
        updatedAt: string;
    };

    invoice?: {
        id: number;
        invoiceNo: string;
        status: "Paid" | "Pending" | "Overdue";
        createdAt: string;
        receiptSent?: boolean;
        billId?: number;
        updatedAt?: string;
    };

    receipt?: {
        id: number;
        paidDate: string;
        paymentMethod: string;
        createdAt?: string;
        updatedAt?: string;
        invoiceId?: number;
    };
}