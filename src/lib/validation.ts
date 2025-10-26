import { z } from "zod";

export const serviceFormSchema = z.object({
  description: z
    .string("Description is required.")
    .min(10, { message: "Description must be at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a service type" }),
  priority_level: z
    .string()
    .min(1, { message: "Please select a priority level" }),
});

export type serviceFormValue = z.infer<typeof serviceFormSchema>;
