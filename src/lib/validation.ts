import { z } from "zod";

export const serviceFormSchema = z.object({
  description: z
    .string("Description is required.")
    .min(10, { message: "Description must be at least 10 characters" }),
  category: z.enum(['Complain', 'Maintenance', 'Other'], "Service type must be one of Complain, Maintenance or Other "),
  priorityLevel: z.enum(["Low", "Medium", "High"], "Priority level must be one of Low, Medium or High"),
});

export type serviceFormValue = z.infer<typeof serviceFormSchema>;
