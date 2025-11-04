export interface Profile {
	id: string;
	name: string;
	email: string;
	phNumber: string;
	emergencyNo: string;
	roomId: string;
	role: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface updateProfilePayload {
	userId: string;
	userName?: string;
	email?: string;
	phNumber?: string;
}

export interface UpdatePasswordPayload {
	userId: string;
	oldPassword: string;
	newPassword: string;
}