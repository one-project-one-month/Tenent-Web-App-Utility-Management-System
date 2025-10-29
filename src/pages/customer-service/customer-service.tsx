import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactUs from "@/components/customer-service/contact-us";
import NewRequest from "@/components/customer-service/new-request";
import ServiceHistory from "@/components/customer-service/service-history";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/service/api-client";
import type { ApiResponse } from "@/types/api";



type dataType = {
  data: { roomId: string }
}
const CustomerService = () => {
  const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId);

  const { data } = useQuery({
    queryKey: ['tenant', tenantId],
    queryFn: async (): Promise<ApiResponse<dataType>> => {
      const res = await apiClient.get(`/api/v1/tenants/${tenantId}`)
      return res.data
    },
    enabled: !!tenantId
  })

  const roomId = data?.content?.data.roomId
  return (
    <section className="mt-10 text-text-primary">
      <h1 className="text-h2 text-gray-700 font-semibold">Customer Service </h1>
      <h3 className="text-h6 text-gray-700 font-medium">
        Get help with utilities, billing, and property  <br /> services
      </h3>
      <div className="w-full mt-10 flex justify-between">
        <Tabs defaultValue="request" className="w-full">
          <TabsList>
            <TabsTrigger value="request">New Request</TabsTrigger>
            <TabsTrigger value="history">Service History</TabsTrigger>
          </TabsList>
          <div className="flex flex-col md:flex-row gap-6 mt-10 items-start">
            <ContactUs />
            <TabsContent value="request">
              <NewRequest tenantId={tenantId!} roomId={roomId!} />
            </TabsContent>
            <TabsContent value="history">
              <ServiceHistory />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default CustomerService;
