import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useFetchCustomerServices } from "@/hooks/use-customer-service";
import { type RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ServiceCard from "./components/service-card";

const ServiceHistory = () => {
  const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId);

  const { data: customerServices, isLoading, error} = useFetchCustomerServices(Number(tenantId))

  console.log('data', customerServices?.data)
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = customerServices?.meta?.total;
 

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages!) return;
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading service history.</div>;
  }
  return (
    <div className="text-text-primary">
      <div className="flex-1 flex flex-col items-start w-full border border-gray-300 bg-card rounded-sm shadow-sm p-5">
        <h3 className="text-2xl font-semibold mb-3">Submit New Request</h3>
        <p className="mb-10">
          Fill out the form below and we'll get back to you as soon as possible
        </p>
        <div className=" flex flex-col gap-4 ">
          {customerServices?.data.map((service) => (
            <ServiceCard key={service.id} service={service}/>
          ))}
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
