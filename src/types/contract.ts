export type ContractType = {
  id: string;
  name: string;
  duration: number;
  price: string;
  facilities: string[];
};

export type Room = {
  id: string;
  roomNo: number;
  floor: number;
  dimension: string;
  noOfBedRoom: number;
  status: string;
  sellingPrice: number;
  maxNoOfPeople: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Tenant = {
  name: string;
  nrc: string;
  email: string;
  phNumber: string;
  emergencyNo: string;
};

export type Contract = {
  id: string;
  roomId: string;
  tenantId: number;
  createdDate: string;
  expiryDate: string;
  room: Room;
  tenant: Tenant;
  contractType: ContractType;
};
