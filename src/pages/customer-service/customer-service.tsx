import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactUs from "@/components/customer-service/contact-us";
import NewRequest from "@/components/customer-service/new-request";
import ServiceHistory from "@/components/customer-service/service-history";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";


import { useServiceRoom } from "@/hooks/use-service";



const CustomerService = () => {
  //Get tenantId
  const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId);
  //Get room id 
  const { data: roomId } = useServiceRoom(tenantId!)

  return (
    <section className="mt-10 text-text-primary space-y-5">
      <div>
        <h1 className="text-xl text-gray-700 font-semibold">Customer Service </h1>
        <h3 className="text-h6 text-gray-700 font-medium">
          Get help with utilities, billing, and property  <br /> services
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
