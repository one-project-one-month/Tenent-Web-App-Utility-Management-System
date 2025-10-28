import { Button } from "@/components/ui/button"
import { Contact, Pencil, UserCog } from "lucide-react"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface profileFormFields {
  fullName: string
  email: string
  phoneNo: string
  location: string
  roomNo: string
  role: string
  memberSince: Date
  status: string
}

const ProfileTab = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { handleSubmit, control } = useForm<profileFormFields>({
    defaultValues: {
      fullName: "Jenny Wilson",
      email: "Jenny4207@gmail.com",
      phoneNo: "09 123 456 789",
      location: "456 Riverside Apartment, Unit 3B San Francisco, CA 94102",
      roomNo: "A-104",
      role: "Tenant",
      memberSince: new Date(),
      status: "Active",
    },
  });

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
              <UserCog /> Edit Profile
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

      <form action="" className="flex flex-col gap-4 my-4">
        {/* Action Buttons */}
        {renderActionButtons()}

        {/* Editable Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 md:gap-4">
          <fieldset>
            <Label htmlFor="fullName" className="text-[20px] text-gray-700 mb-1">Full Name</Label>
            <div className="relative">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => <Input {...field} disabled={!editMode} className="shadow border-foreground/40 py-6" />}
              />
              {editMode && (<Pencil className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5" />)}
            </div>
          </fieldset>

          <fieldset>
            <Label htmlFor="email" className="text-[20px] text-gray-700 mb-1">Email</Label>
            <div className="relative">
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} disabled={!editMode} className="shadow border-foreground/40 py-6" />}
              />
              {editMode && (<Pencil className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5" />)}
            </div>
          </fieldset>

          <fieldset>
            <Label htmlFor="phoneNo" className="text-[20px] text-gray-700 mb-1">Phone Number</Label>
            <div className="relative">
              <Controller
                name="phoneNo"
                control={control}
                render={({ field }) => <Input {...field} disabled={!editMode} className="shadow border-foreground/40 py-6" />}
              />
              {editMode && (<Pencil className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5" />)}
            </div>
          </fieldset>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="col-span-2">
            <Label htmlFor="location" className="text-[20px] text-gray-700 mb-1">Location</Label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => <Input {...field} disabled className="shadow border-foreground/40 py-6" />}
            />
          </div>

          <div>
            <Label htmlFor="roomNo" className="text-[20px] text-gray-700 mb-1">Room No</Label>
            <Controller
              name="roomNo"
              control={control}
              render={({ field }) => <Input {...field} disabled className="shadow border-foreground/40 py-6" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 md:gap-4">
          <div>
            <Label htmlFor="role" className="text-[20px] text-gray-700 mb-1">Role</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => <Input {...field} disabled className="shadow border-foreground/40 py-6" />}
            />
          </div>

          <div>
            <Label htmlFor="memberSince" className="text-[20px] text-gray-700 mb-1">Member Since</Label>
            <Controller
              name="memberSince"
              control={control}
              render={({ field }) =>
                <Input type="date" {...field}
                  value={field.value ? field.value.toISOString().split("T")[0] : ""}
                  disabled
                  className="shadow border-foreground/40 py-6"
                />
              }
            />
          </div>

          <div>
            <Label htmlFor="status" className="text-[20px] text-gray-700 mb-1">Account Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => <Input {...field} disabled className="shadow border-foreground/40 py-6" />}
            />
          </div>
        </div>

      </form>
    </>
  )
}

export default ProfileTab