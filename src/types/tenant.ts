export interface Tenant {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  emergencyNo: string;
  roomNo: string;
  roomId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePasswordPayload {
  userId: string;
  currentPassword: string;
  newPassword: string;
}
