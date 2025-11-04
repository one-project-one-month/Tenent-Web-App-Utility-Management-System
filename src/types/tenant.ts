export interface Tenant {
	id: string;
	name: string;
	email: string;
	phNumber: string;
	emergencyNo: string;
	roomId: string;
	user: {
		role: string;
		isActive: boolean;
		createdAt: Date;
		updatedAt: Date;
	};
}
