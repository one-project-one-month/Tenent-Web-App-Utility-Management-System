import { useEffect, useState, type FormEvent } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { CircleUser, Contact, LogOut, LogOutIcon, MoveLeft, Pencil, Shield, User, UserCog } from "lucide-react";
import { FourSquare } from "react-loading-indicators";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useLogout } from "@/hooks/use-auth";
import { useTenantQuery } from "@/hooks/use-tenant";
import type { RootState } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

type ProfileFieldType = {
  field: string;
  value: string;
};

const ProfileField = ({ field, value }: ProfileFieldType) => {
  return (
    <div className="mb-6">
      <p className="text-h6 text-secondary-foreground">{field}:</p>
      <p className="text-muted-foreground">{value}</p>
    </div>
  );
};

const profile = () => {
  const navigate = useNavigate();
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
  const [editMode, setEditMode] = useState<boolean>(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId);

  const { mutate: logout } = useLogout();
  // const { data: profile, isLoading } = useTenantQuery(tenantId as string);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    logout();
  };

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

  // if (isLoading) {
  //   return (
  //     <div className="h-full w-full flex items-center justify-center">
  //       <FourSquare
  //         color="#2563eb"
  //         size="medium"
  //         text="Loading Profile..."
  //         textColor=""
  //       />
  //     </div>
  //   );
  // }

  return (
    <div>
      <Card className="mb-6">
        <CardContent className="flex flex-col sm:flex-row justify-between align-start">
          <div className="flex gap-4 justify-start items-end">
            <Avatar className="w-2/5 h-auto sm:w-40 rounded-sm">
              <AvatarImage src="https://github.com/shadcn.png" alt="Tenant" />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
            <CardTitle>
              <h1 className="text-h3">Jenny Wilson</h1>
              <h3 className="text-h4 text-[#4F4F4F] mb-2">T-0001</h3>
              <Badge className="bg-secondary py-2 px-4">Active</Badge>
            </CardTitle>
          </div>
          <CardAction className="mt-6 w-full sm:w-auto">
            <Button className="w-full bg-destructive/70 flex items-center justify-center p-6 text-background gap-2 hover:bg-destructive focus:bg-destructive"><LogOutIcon /> Logout</Button>
          </CardAction>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full mb-10">
              <TabsTrigger value="account"><CircleUser />Profile</TabsTrigger>
              <TabsTrigger value="password"><Shield />Security</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
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
                    <Label htmlFor="fullName" className="text-[20px]">Full Name</Label>
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
                    <Label htmlFor="email" className="text-[20px]">Email</Label>
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
                    <Label htmlFor="phoneNo" className="text-[20px]">Phone Number</Label>
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

                <div>
                  <Label htmlFor="location" className="text-[20px]">Location</Label>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => <Textarea {...field} disabled className="shadow border-foreground/40 py-6" />}
                  />
                </div>

                <div>
                  <Label htmlFor="roomNo" className="text-[20px]">Room No</Label>
                  <Controller
                    name="roomNo"
                    control={control}
                    render={({ field }) => <Input {...field} disabled className="shadow border-foreground/40 py-6" />}
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="text-[20px]">Role</Label>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => <Input {...field} disabled className="shadow border-foreground/40 py-6" />}
                  />
                </div>

                <div>
                  <Label htmlFor="memberSince" className="text-[20px]">Member Since</Label>
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
                  <Label htmlFor="status" className="text-[20px]">Account Status</Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => <Input {...field} disabled className="shadow border-foreground/40 py-6" />}
                  />
                </div>
              </form>
            </TabsContent>

            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default profile;
