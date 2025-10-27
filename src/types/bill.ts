export interface Bill {
  id: string;
  rentalFee: string | null;
  electricityFee: string | null;
  waterFee: string | null;
  fineFee: string | null;
  serviceFee: string | null;
  groundFee: string | null;
  carParkingFee: string | null;
  wifiFee: string | null;
  totalAmount: string | null;
  dueDate: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  roomId: string;
  room?: {
    id: string;
    roomNo: number;
    floor: number;
    dimension: string;
    noOfBedRoom: number;
    status: string;
    sellingPrice: string | null;
    maxNoOfPeople: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    tenant?: {
      id: string;
      name: string;
      email: string;
      nrc: string;
      phoneNo: string;
      emergencyNo: string;
      createdAt: string;
      updatedAt: string;
      roomId: string;
    };
  };
  totalUnit?: {
    id: string;
    electricityUnits: string;
    waterUnits: string;
    createdAt: string;
    updatedAt: string;
    billId: string;
  };
  invoice?: {
    id: string;
    invoiceNo: string;
    status: "Paid" | "Pending" | "Overdue";
    receiptSent: boolean;
    billId: string;
    createdAt: string;
    updatedAt: string;
    receipt?: {
      id: string;
      paymentMethod: string;
      paidDate: string;
      createdAt: string;
      updatedAt: string;
      invoiceId: string;
    };
  };
}
