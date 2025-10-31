import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import StatusBadge, { type Status } from "@/components/common/status-badge";
import { Badge } from "../ui/badge";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import apiClient from "@/service/api-client";
import { useServiceHistory } from "@/hooks/use-service";


const priorityToVariant = {
  High: "default",
  Medium: "outline",
  Low: "secondary",
} as const
const ServiceHistory = ({ tenantId }: { tenantId: string }) => {



  const { data: services, isLoading, error, isError } = useServiceHistory({ tenantId })

  if (isLoading) {
    return <>Loading.....</>
  }


  return (
    <div className="text-text-primary">
      <div className="flex-1 flex flex-col items-start border border-gray-300 bg-card rounded-sm shadow-sm p-5 max-w-lg">
        <h3 className="text-2xl font-semibold mb-3">My Service History</h3>
        <p className="mb-10">
          The status of your submitted requests
        </p>
        <div className=" flex flex-col w-fit gap-4 ">
          {services?.data.map((card) => (
            <div
              className=" flex flex-col gap-3 border-b border-gray-500 "
              key={card.id}
            >
              <div className="flex justify-between items-start md:items-center gap-2">
                <div className="flex flex-col sm:flex-row gap-2 ">
                  <p className=" font-semibold">{card.category}</p>
                  <div className="flex items-center gap-2">

                    <StatusBadge
                      className="px-2 py-1"
                      status={card.status as Status}
                    />
                    <Badge
                      className="text-badge-text"
                      variant={priorityToVariant[card.priorityLevel]}
                    >
                      {card.priorityLevel}
                    </Badge>
                  </div>
                </div>
                <p className=" text-gray-700">{new Date(card.issuedDate).toLocaleDateString()}</p>
              </div>
              <p className=" text-slate-500 text-sm bg-background rounded-sm px-2 py-4 mb-2 text-wrap">
                {card.description}
              </p>

            </div>
          ))}
        </div>
      </div>
      {/* <Pagination className="my-5">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </PaginationItem>

          <PaginationItem >
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {total}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              className={currentPage === total ? "pointer-events-none opacity-50" : ""}
              onClick={(e) => {
                e.preventDefault();
                // goToPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </div>
  );
};

export default ServiceHistory;
