import { Button } from "@/components/ui/button"
import { Contact, Pencil, UserCog } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form";
import * as z from "zod"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Tenant } from "@/types/profile";
import { useUpdateProfileQuery } from "@/hooks/use-profile";
import { toast } from "sonner";
import { useFetchRoomQuery } from "@/hooks/use-room";

const formSchema = z.object({
  name: z.string().min(1, { message: "Full name is required." }).min(5, { message: "Full name must be at least 5 characters long." }),
  email: z.email().min(1, { message: "Email is required." }),
  phNumber: z.string().min(1, { message: "Phone number is required." }),
  emergencyNo: z.string().min(1, { message: "Emergency number is required." }),
  roomNo: z.number().min(1, { message: "Room ID is required." }),
  nrc: z.string().min(1, { message: "NRC is required." }),
})

const ProfileTab = ({ profile }: { profile: Tenant }) => {
  const { mutate: updateProfile, isPending } = useUpdateProfileQuery(profile.id);
  const { room, isLoading } = useFetchRoomQuery(profile.id);
  const roomNo = room?.roomNo;

  const [editMode, setEditMode] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    name: profile.name,
    email: profile.email,
    phNumber: profile.phNumber,
    emergencyNo: profile.emergencyNo,
    roomNo,
    nrc: profile.nrc
  },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    updateProfile({ tenantId: profile.id, roomId: profile.roomId, ...data });
    setEditMode(false);
  }

  const onError = (error: any) => {
    console.error(error);
    toast.error(error.name.message || "Something went wrong. Try again.");
  }

  const renderActionButtons = () => {
    return (
      <div className="mb-6">
        {
          editMode ? (
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="submit"
                className="text-white p-6 font-light"
                disabled={isPending}
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
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="flex flex-col gap-8 my-4 pb-8">
          {/* Action Buttons */}
          {renderActionButtons()}

          {/* Mutable Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-2 md:gap-4">
            <FormField
              control={form.control}
              name="name"
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
              name="phNumber"
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
              <Textarea disabled placeholder="456 Riverside Apartment, Unit 3B San Francisco, CA 94102" className="shadow border-foreground/40 py-6 text-slate-500 wrap-text whitespae-pre-line" />
            </div>

            <div>
              <Label htmlFor="roomNo" className="text-[20px] text-gray-700 mb-1">Room No</Label>
              <Input type="text" disabled placeholder={isLoading ? "Loading..." : String(roomNo) || "N/A"} className="shadow border-foreground/40 py-6 text-slate-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-2 md:gap-4">
            <div>
              <Label htmlFor="role" className="text-[20px] text-gray-700 mb-1">Role</Label>
              <Input type="text" disabled placeholder={profile.user?.role} className="shadow border-foreground/40 py-6 text-slate-500" />
            </div>

            <div>
              <Label htmlFor="memberSince" className="text-[20px] text-gray-700 mb-1">Member Since</Label>
              <Input type="text" disabled placeholder={new Date(profile.user?.createdAt!).toLocaleDateString()} className="shadow border-foreground/40 py-6 text-slate-500" />
            </div>

            <div>
              <Label htmlFor="status" className="text-[20px] text-gray-700 mb-1">Account Status</Label>
              <Input type="text" disabled placeholder={profile.user?.isActive ? "Active" : "Inactive"} className="shadow border-foreground/40 py-6 text-slate-500" />
            </div>
          </div>

        </form>
      </Form>
    </>
  )
}

export default ProfileTab