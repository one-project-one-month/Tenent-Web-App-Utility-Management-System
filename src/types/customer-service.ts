export type CustomerService = {
  id: number;
  roomId: string;
  category: ServiceCategory;
  description: string;
  status: ServiceStatus;
  priorityLevel: PriorityLevel;
  issuedDate: Date;
};


export type ServiceCategory = "Complain" | "Maintenance"  | "Other"

export type ServiceStatus = "Pending" | "Ongoing" | "Resolved"

export type PriorityLevel = "High" | "Medium" | "Low"