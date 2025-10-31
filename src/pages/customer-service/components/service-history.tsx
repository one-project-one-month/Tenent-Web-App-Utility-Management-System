import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useServiceHistory } from "@/hooks/use-service";

import { useState } from "react";


import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { ServiceStatus } from "@/types/service";
import NotFoundService from "./no-service";
import ServiceCard from "./serviceCard";
import ServiceLoading from "@/components/customer-service/service-loading";


const ServiceHistory = ({ tenantId }: { tenantId: string }) => {

  const [status, setStatus] = useState<ServiceStatus | string>('')
  const [currentPage, setCurrentPage] = useState(1);
  const { data: services, isLoading } = useServiceHistory({ tenantId, status, page: currentPage })

  if (isLoading) {
    return <ServiceLoading />
  }

  if (!services?.data || services?.data.length === 0) {
    return <NotFoundService onReset={() => setStatus('')} />
  }
  const totalPages = services?.meta?.lastPage;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages!) return;
    setCurrentPage(page);
  };
  return (
    <div>
      <Select
        onValueChange={(value) => {
          setStatus(value);
          setCurrentPage(1);
        }}
        value={status ?? ''}
      >
        <SelectTrigger className="w-[180px] border-2 border-border bg-input">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent className="bg-input">
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Ongoing">Ongoing</SelectItem>
          <SelectItem value="Resolved">Resolved</SelectItem>
        </SelectContent>
      </Select>


      <div className="w-full text-text-primary mt-4">
        <div className="flex flex-col items-start border border-gray-300 bg-card rounded-sm shadow-sm p-5">
          <h3 className="text-2xl font-semibold mb-3">My Service History</h3>
          <p className="mb-10">
            The status of your submitted requests
          </p>
          <div className="w-full space-y-4">
            {
              services?.data.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))
            }
          </div>

        </div>
        <Pagination className="my-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(currentPage - 1);
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages! }).map((_, index) => {
              const page = index + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ServiceHistory;
