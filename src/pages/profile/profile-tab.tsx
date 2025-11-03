import { Button } from "@/components/ui/button"
import { Contact, Pencil, UserCog } from "lucide-react"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form";
import * as z from "zod"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Profile } from "@/types/profile";

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  email: z.string().min(1, { message: "Email is required." }),
  phoneNo: z.string().min(1, { message: "Phone number is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  roomNo: z.string().min(1, { message: "Room number is required." }),
  role: z.string().min(1, { message: "Role is required." }),
  memberSince: z.date(),
  status: z.string().min(1, { message: "Status is required." }),
})

const ProfileTab = ({ profile }: { profile: Profile}) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: profile.name,
      email: profile.email,
      phoneNo: profile.phNumber,
      location: "456 Riverside Apartment, Unit 3B San Francisco, CA 94102",
      roomNo: profile.roomId,
      role: profile.role,
      memberSince: profile.createdAt,
      status: profile.isActive ? "Active" : "Inactive",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  }

  const renderActionButtons = () => {
    return (
      <div className="mb-6">
        {
          editMode ? (
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="text-white p-6 font-light"
              >
                Update
              </Button>
              <Button
                className="p-6 font-light border-primary"
                variant="outline"
                onClick={() => setEditMode(false)}
              >Cancel</Button>
            </div>
          ) : (
            <Button
              className="w-full text-white p-6 font-light"
              onClick={() => setEditMode(true)}
            >
              <UserCog className="scale-[1.5] mr-2" /> Edit Profile
            </Button>
          )
        }
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <h4 className="text-sub-heading flex gap-2 text-[#333333] mb-2"><Contact /> Personal Information</h4>
        <p className="text-muted-foreground text-body-1">Update your personal details and contact information</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 my-4 pb-8">
          {/* Action Buttons */}
          {renderActionButtons()}

          {/* Mutable Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-2 md:gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-[20px] text-gray-700 mb-1">Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="text" placeholder="Jenny Wilson" {...field} disabled={!editMode} className="shadow border-foreground/40 py-6 text-slate-500" />
                      {editMode && <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4" />}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-[20px] text-gray-700 mb-1">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="text" placeholder="Jenny Wilson" {...field} disabled={!editMode} className="shadow border-foreground/40 py-6 text-slate-500" />
                      {editMode && <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4" />}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-[20px] text-gray-700 mb-1">Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="text" placeholder="Jenny Wilson" {...field} disabled={!editMode} className="shadow border-foreground/40 py-6 text-slate-500" />
                      {editMode && <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4" />}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Immutable Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="sm:col-span-2">
              <Label htmlFor="location" className="text-[20px] text-gray-700 mb-1">Location</Label>
              <Controller
                name="location"
                control={form.control}
                render={({ field }) => <Textarea {...field} disabled className="shadow border-foreground/40 py-6 text-slate-500 wrap-text whitespae-pre-line" />}
              />
            </div>

            <div>
              <Label htmlFor="roomNo" className="text-[20px] text-gray-700 mb-1">Room No</Label>
              <Controller
                name="roomNo"
                control={form.control}
                render={({ field }) => <Input {...field} disabled className="shadow border-foreground/40 py-6 text-slate-500" />}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-2 md:gap-4">
            <div>
              <Label htmlFor="role" className="text-[20px] text-gray-700 mb-1">Role</Label>
              <Controller
                name="role"
                control={form.control}
                render={({ field }) => <Input {...field} disabled className="shadow border-foreground/40 py-6 text-slate-500" />}
              />
            </div>

            <div>
              <Label htmlFor="memberSince" className="text-[20px] text-gray-700 mb-1">Member Since</Label>
              <Controller
                name="memberSince"
                control={form.control}
                render={({ field }) =>
                  <Input type="text" {...field}
                    value={field.value ? new Date(field.value).toLocaleDateString() : ""}
                    disabled
                    className="shadow border-foreground/40 py-6 text-slate-500"
                  />
                }
              />
            </div>

            <div>
              <Label htmlFor="status" className="text-[20px] text-gray-700 mb-1">Account Status</Label>
              <Controller
                name="status"
                control={form.control}
                render={({ field }) => <Input {...field} disabled className="shadow border-foreground/40 py-6 text-slate-500" />}
              />
            </div>
          </div>

        </form>
      </Form>
    </>
  )
}

export default ProfileTab