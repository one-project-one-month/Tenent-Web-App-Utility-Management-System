import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactUs from "@/components/customer-service/contact-us";
import NewRequest from "@/components/customer-service/new-request";
import ServiceHistory from "@/components/customer-service/service-history";

const CustomerService = () => {
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
              <NewRequest />
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
