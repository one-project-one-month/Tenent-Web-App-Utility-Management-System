export type ContractType = {
  id: string;
  name: string;
  duration: number;
  price: string;
  facilities: string[];
  createdAt: string;
  updatedAt: string;
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

export type Contract = {
  id: string;
  expiryDate: string;
  createdDate: string;
  updatedDate: string;
  roomId: string;
  tenantId: string;
  contractTypeId: string;
  tenant: Tenant;
  room: Room;
  contractType: ContractType;
};
