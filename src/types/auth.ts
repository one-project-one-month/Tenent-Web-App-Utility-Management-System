import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters long.",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export interface LoginResponse {
  accessToken: string;
  user: AuthUser | null;
}

export interface AuthUser {
  id: string;
  userName: string;
  email: string;
  role: string;
  tenantId: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}