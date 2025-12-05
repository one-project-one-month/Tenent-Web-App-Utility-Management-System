import { useState } from "react";
import { useServiceHistory } from "@/hooks/use-service";
import type { ServiceStatus } from "@/types/service";
import NotFoundService from "./no-service";
import ServiceCard from "./serviceCard";
import ServiceLoading from "@/pages/customer-service/components/service-loading";
import SelectBox from "./select-box";
import { statusValue } from "../utils";
import ServicePagination from "./service-pagination";


const ServiceHistory = ({ tenantId }: { tenantId: string }) => {
  const [status, setStatus] = useState<ServiceStatus | string>('')
  const [currentPage, setCurrentPage] = useState(1);
  const { data: services, isLoading } = useServiceHistory({ tenantId, status, page: currentPage })


  const notFound = !services?.data || services?.data.length === 0
  //total page for pagination
  const totalPages = services?.meta?.lastPage;

  const onChange = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
  }
  return (
    <section>
      <SelectBox
        value={status}
        onChange={onChange}
        placeholder="All statuses"
        items={statusValue}
        className="w-40 border-2 border-border bg-input"
      />

      {/* Service history container */}
      <div className="w-full text-text-primary mt-3">
        <div className="flex flex-col items-start border border-gray-300 bg-card rounded-sm shadow-sm p-5">
          <h3 className="text-2xl font-semibold mb-3">My Service History</h3>
          <p>
            The status of your submitted requests
          </p>
          {/* Service history card */}
          <div className="w-full space-y-4 mt-4">
            {
              isLoading ?
                <ServiceLoading /> :
                notFound ? <NotFoundService onReset={() => setStatus('')} /> :
                  <ServiceCard services={services.data} />
            }
          </div>
        </div>
        {/* Pagination */}
        <ServicePagination
          totalPages={totalPages!}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default ServiceHistory;
