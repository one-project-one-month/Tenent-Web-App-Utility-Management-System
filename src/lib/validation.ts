import { z } from "zod"

export const serviceFormSchema = z.object({
    description: z
        .string('Description is required.')
        .min(10, { message: 'Description must be at least 10 characters' }),
    category: z.enum(
        ['Complain', 'Maintenance', 'Other'],
        "Category must be one of 'Complain', 'Maintenance', or 'Other'"
    ),
    status: z.enum(
        ['Pending', 'Ongoing', 'Resolved'],
        "Status must be one of 'Pending', 'Ongoing', or 'Resolved'"
    ).default("Pending").optional(),
    priority_level: z.enum(
        ['Low', 'Medium', 'High'],
        "Priority Level must be one of 'Low', 'Medium', or 'High'"
    ).default("Low").optional(),
    room_id: z.uuid({ version: 'v4', error: 'Invalid UUID' }),
})

export type serviceFormValue = z.infer<typeof serviceFormSchema>