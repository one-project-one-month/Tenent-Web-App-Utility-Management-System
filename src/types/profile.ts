export interface Tenant {
	id: string;
	name: string;
	email: string;
	phNumber: string;
	emergencyNo: string;
	roomId: string;
	roomNo?: number;
	nrc: string;
	user: {
		role: string;
		isActive: boolean;
		createdAt: Date;
		updatedAt: Date;
	}
}

export interface updateProfilePayload {
	tenantId: string;
	roomId: string;
	nrc?: string;
	name?: string;
	email?: string;
	phNumber?: string;
	emergencyNo?: string;
}

export interface UpdatePasswordPayload {
	tenantId: string;
	currentPassword: string;
	newPassword: string;
}