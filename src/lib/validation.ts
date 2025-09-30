import { z } from "zod"

export const serviceFormSchema = z.object({
    name: z.string("Name is required.").min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    email: z.string("Email is required.").email({
        message: 'Please enter a valid email address.',
    }),
    roomNo: z.string("Room number is required.").min(1, {
        message: 'Room number is required.',
    }),
    phone: z.string("Phone number is required.").min(10, {
        message: 'Phone number must be at least 10 digits.',
    }),
    category: z.string("This filed is required.").min(1, { message: "Select service type." }),
    description: z.string("Description is required.").min(10, {
        message: 'Description must be at least 10 characters.',
    }),
})

export type serviceFormValue = z.infer<typeof serviceFormSchema>