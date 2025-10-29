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
import { getServiceHistory } from "@/service/contract-service";

type cardProps = {
  id: number;
  title: string;
  priority: "Low" | "Medium" | "High";
  issueDate: string;
  status: string;
  description: string;
};
const cards: cardProps[] = [
  {
    id: 1,
    title: "Electrical Issues",
    issueDate: "26.9.2025",
    status: "Pending",
    priority: "High",
    description:
      "Churning management driving supervisor cross-pollination are it game. Dive closest discussions feature I quick management picture. This issue has been observed across several departments and requires further investigation by the facilities team to prevent recurring disruptions and ensure operational stability.",
  },
  {
    id: 2,
    title: "Electrical Issue",
    issueDate: "27.9.2025",
    status: "In-progress",
    priority: "High",
    description:
      "Investigating unexpected server outages causing reduced performance in key workflows. The infrastructure team is currently reviewing log files, monitoring CPU usage, and collaborating with external vendors to identify the root cause. Temporary mitigations are being applied while a long-term fix is prepared.",
  },
  {
    id: 3,
    title: "Maintenance Issue",
    issueDate: "28.9.2025",
    status: "Resolved",
    priority: "Low",
    description:
      "Handled escalation related to billing discrepancies. Resolution confirmed with customer satisfaction. The finance department coordinated closely with customer support to reconcile account balances, and communication was provided to the client to ensure transparency and build trust.",
  },
  {
    id: 4,
    title: "Water Issue",
    issueDate: "29.9.2025",
    status: "Pending",
    priority: "Medium",
    description:
      "Identified packet loss in the data center region leading to slow responses. Awaiting vendor update. The issue has caused delays in data retrieval for internal dashboards, impacting productivity, and requires immediate action from the ISP to restore optimal performance levels.",
  },
  {
    id: 5,
    title: "WiFi/ Internet Issue",
    issueDate: "30.9.2025",
    status: "In-progress",
    priority: "Medium",
    description:
      "Multiple reports of authentication failures across mobile devices. Team is debugging OAuth flow. The issue appears to be intermittent, primarily affecting iOS users, and the authentication service provider has been contacted to confirm if recent updates may be contributing to the failures.",
  },
  {
    id: 6,
    title: "Other",
    issueDate: "1.10.2025",
    status: "Resolved",
    priority: "Low",
    description:
      "Fixed alignment issues in dashboard widgets affecting analytics readability. The design team implemented CSS adjustments and tested across multiple screen resolutions to ensure consistency. Additional quality checks were introduced to prevent such visual issues in future releases.",
  },
  {
    id: 7,
    title: "Billing & Payment Support",
    issueDate: "2.10.2025",
    status: "Pending",
    priority: "High",
    description:
      "Intermittent errors connecting with third-party payment provider. Monitoring service logs for cause. This issue is preventing successful transactions for a subset of users, and has the potential to impact revenue if not addressed quickly. Escalation has been made to the vendor support team.",
  },
  {
    id: 8,
    title: "Billing & Payment Support",
    issueDate: "3.10.2025",
    status: "In-progress",
    priority: "Medium",
    description:
      "Alerts are delayed by several minutes. Reviewing cron job configurations for misfires. The engineering team is analyzing task scheduler logs and testing multiple scenarios to reproduce the problem. This delay has caused missed time-sensitive alerts for clients, raising priority of resolution.",
  },
  {
    id: 9,
    title: "WiFi/ Internet Issue",
    issueDate: "4.10.2025",
    status: "Resolved",
    priority: "Low",
    description:
      "Resolved replication lag between primary and backup databases. Monitoring stability. The database team implemented improved caching and synchronization routines, validated through multiple dry runs, and confirmed that the fix reduced latency. Continuous monitoring is in place to avoid regression.",
  },
  {
    id: 10,
    title: "Security & Safety",
    issueDate: "5.10.2025",
    status: "Pending",
    priority: "High",
    description:
      "Some users unable to access admin panel due to incorrect role assignment. Awaiting fix deployment. The permissions model was recently updated, and inconsistencies between staging and production environments are being reviewed. Once patch is applied, impacted users will regain access rights.",
  },
];

const ServiceHistory = () => {
  const [status, setStatus] = useState<"Pending" | "Ongoing" | "Resolved">('Pending')
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const priorityToVariant = {
    High: "default",
    Medium: "outline",
    Low: "secondary",
  } as const


  const totalPages = Math.ceil(cards.length / pageSize);
  const currentCards = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return cards.slice(start, start + pageSize);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId)


  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['service_history'],
    queryFn: getServiceHistory(tenantId!, status)
  })

  console.log(data, isLoading, isError, error)
  return (
    <div className="text-text-primary">
      <div className="flex-1 flex flex-col items-start w-full border border-gray-300 bg-card rounded-sm shadow-sm p-5">
        <h3 className="text-2xl font-semibold mb-3">My Service History</h3>
        <p className="mb-10">
          The status of your submitted requests
        </p>
        <div className=" flex flex-col gap-4 ">
          {currentCards.map((card) => (
            <div
              className=" flex flex-col gap-3 border-b border-gray-500 "
              key={card.id}
            >
              <div className="flex justify-between items-start md:items-center gap-2">
                <div className="flex flex-col sm:flex-row gap-2 ">
                  <p className=" font-semibold">{card.title}</p>
                  <div className="flex items-center gap-2">

                    <StatusBadge
                      className="px-2 py-1"
                      status={card.status as Status}
                    />
                    <Badge
                      className="text-badge-text"
                      variant={priorityToVariant[card.priority]}
                    >
                      {card.priority}
                    </Badge>
                  </div>
                </div>
                <p className=" text-gray-700">{card.issueDate}</p>
              </div>
              <p className="text-balance text-slate-500 text-sm bg-background rounded-sm px-2 py-4 mb-2 ">
                {card.description}{" "}
              </p>
            </div>
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
          {Array.from({ length: totalPages }).map((_, index) => {
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
