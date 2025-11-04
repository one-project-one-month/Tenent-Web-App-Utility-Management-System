import { useEffect, useState, type FormEvent } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { CircleUser, Contact, LogOut, LogOutIcon, MoveLeft, Pencil, Shield, User, UserCog } from "lucide-react";
import { FourSquare } from "react-loading-indicators";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { useLogout } from "@/hooks/use-auth";
import { useTenantQuery } from "@/hooks/use-profile";
import type { RootState } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfileTab from "./profile-tab";
import SecurityTab from "./security-tab";
import LogoutAlert from "@/components/navbar/logout-alert";
import { useFetchRoomQuery } from "@/hooks/use-room";

const profile = () => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId!);

  const { mutate: logout } = useLogout();
  const { tenant, isLoading } = useTenantQuery(tenantId);
  const { room } = useFetchRoomQuery(tenant?.roomId!);

  console.log("room: ", room);


  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    logout();
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <FourSquare
          color="#2563eb"
          size="medium"
          text="Loading Profile..."
          textColor=""
        />
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <h2 className="text-2xl font-bold text-primary">
          No Data For this Tenant Found!
        </h2>
      </div>
    );
  }

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
              <h1 className="text-h3">{tenant?.name}</h1>
              <h3 className="text-h4 text-[#4F4F4F] mb-2">T-0001</h3>
              <Badge className="bg-secondary py-2 px-4">Active</Badge>
            </CardTitle>
          </div>
          <CardAction className="mt-6 w-full sm:w-auto">
            {/* <Button className="w-full bg-destructive/70 flex items-center justify-center cursor-pointer p-6 text-background gap-2 hover:bg-destructive focus:bg-destructive"><LogOutIcon /> Logout</Button> */}
            <LogoutAlert props="w-full bg-destructive/70 flex items-center justify-center cursor-pointer p-6 text-background gap-2 hover:bg-destructive focus:bg-destructive" />
          </CardAction>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full mb-10" >
              <TabsTrigger value="profile"><CircleUser />Profile</TabsTrigger>
              <TabsTrigger value="security"><Shield />Security</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <ProfileTab profile={tenant} />
            </TabsContent>

            <TabsContent value="security">
              <SecurityTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default profile;
