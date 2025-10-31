import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useServiceHistory } from "@/hooks/use-service";
import ServiceCard from "./serviceCard";
import { useState } from "react";



const ServiceHistory = ({ tenantId }: { tenantId: string }) => {

  const [status, setStatus] = useState(undefined)
  const [currentPage, setCurrentPage] = useState(1);
  const { data: services, isLoading } = useServiceHistory({ tenantId, status, page: currentPage })

  if (isLoading) {
    return <>Loading.....</>
  }

  const totalPages = services?.meta?.lastPage;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages!) return;
    setCurrentPage(page);
  };
  return (
    <div className="w-full text-text-primary ">
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
  );
};

export default ServiceHistory;
