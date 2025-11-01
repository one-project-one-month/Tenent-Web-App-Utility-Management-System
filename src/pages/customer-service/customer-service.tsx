import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useServiceRoom } from "@/hooks/use-service";
import NewRequest from "./components/new-request";
import ContactUs from "./components/contact-us";
import ServiceHistory from "./components/service-history";



const CustomerService = () => {
  //Get tenantId
  const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId);
  //Get room id 
  const { data: roomId } = useServiceRoom(tenantId!)

  return (
    <section className="mt-10 text-text-primary space-y-5 px-4">
      <div>
        <h1 className="text-2xl font-bold">Customer Service </h1>
        <h3 className="text-md">
          Get help with utilities, billing, and property  services
        </h3>
      </div>

      <Tabs defaultValue="request">
        <TabsList>
          <TabsTrigger value="request">New Request</TabsTrigger>
          <TabsTrigger value="history">Service History</TabsTrigger>
        </TabsList>
        <div className="flex flex-col md:flex-row gap-6  items-start mt-4">
          <ContactUs />
          <div className="flex-1">
            <TabsContent value="request">
              <NewRequest tenantId={tenantId!} roomId={roomId!} />
            </TabsContent>
            <TabsContent value="history">
              <ServiceHistory tenantId={tenantId!} />
            </TabsContent>
          </div>
        </div>
      </Tabs>

    </section>
  );
};

export default CustomerService;
