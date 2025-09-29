import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type cardProps = {
  id: number;
  title: string;
  issueDate: string;
  status: string;
  description: string;
};

const serviceHistory = () => {
  const cards: cardProps[] = [
    {
      id: 1,
      title: "Maintenance Issues",
      issueDate: "26.9.2025",
      status: "Pending",
      description:
        "Churning management driving supervisor cross-pollination are it game. Dive closest discussions feature I quick management picture. This issue has been observed across several departments and requires further investigation by the facilities team to prevent recurring disruptions and ensure operational stability.",
    },
    {
      id: 2,
      title: "System Downtime",
      issueDate: "27.9.2025",
      status: "In-progress",
      description:
        "Investigating unexpected server outages causing reduced performance in key workflows. The infrastructure team is currently reviewing log files, monitoring CPU usage, and collaborating with external vendors to identify the root cause. Temporary mitigations are being applied while a long-term fix is prepared.",
    },
    {
      id: 3,
      title: "Customer Request",
      issueDate: "28.9.2025",
      status: "Resolved",
      description:
        "Handled escalation related to billing discrepancies. Resolution confirmed with customer satisfaction. The finance department coordinated closely with customer support to reconcile account balances, and communication was provided to the client to ensure transparency and build trust.",
    },
    {
      id: 4,
      title: "Network Latency",
      issueDate: "29.9.2025",
      status: "Pending",
      description:
        "Identified packet loss in the data center region leading to slow responses. Awaiting vendor update. The issue has caused delays in data retrieval for internal dashboards, impacting productivity, and requires immediate action from the ISP to restore optimal performance levels.",
    },
    {
      id: 5,
      title: "Login Errors",
      issueDate: "30.9.2025",
      status: "In-progress",
      description:
        "Multiple reports of authentication failures across mobile devices. Team is debugging OAuth flow. The issue appears to be intermittent, primarily affecting iOS users, and the authentication service provider has been contacted to confirm if recent updates may be contributing to the failures.",
    },
    {
      id: 6,
      title: "UI Bug Report",
      issueDate: "1.10.2025",
      status: "Resolved",
      description:
        "Fixed alignment issues in dashboard widgets affecting analytics readability. The design team implemented CSS adjustments and tested across multiple screen resolutions to ensure consistency. Additional quality checks were introduced to prevent such visual issues in future releases.",
    },
    {
      id: 7,
      title: "Payment Gateway Failure",
      issueDate: "2.10.2025",
      status: "Pending",
      description:
        "Intermittent errors connecting with third-party payment provider. Monitoring service logs for cause. This issue is preventing successful transactions for a subset of users, and has the potential to impact revenue if not addressed quickly. Escalation has been made to the vendor support team.",
    },
    {
      id: 8,
      title: "Email Notification Delay",
      issueDate: "3.10.2025",
      status: "In-progress",
      description:
        "Alerts are delayed by several minutes. Reviewing cron job configurations for misfires. The engineering team is analyzing task scheduler logs and testing multiple scenarios to reproduce the problem. This delay has caused missed time-sensitive alerts for clients, raising priority of resolution.",
    },
    {
      id: 9,
      title: "Data Sync Issue",
      issueDate: "4.10.2025",
      status: "Resolved",
      description:
        "Resolved replication lag between primary and backup databases. Monitoring stability. The database team implemented improved caching and synchronization routines, validated through multiple dry runs, and confirmed that the fix reduced latency. Continuous monitoring is in place to avoid regression.",
    },
    {
      id: 10,
      title: "Access Permission Error",
      issueDate: "5.10.2025",
      status: "Pending",
      description:
        "Some users unable to access admin panel due to incorrect role assignment. Awaiting fix deployment. The permissions model was recently updated, and inconsistencies between staging and production environments are being reviewed. Once patch is applied, impacted users will regain access rights.",
    },
  ];

  return (
    <div>
      <div className="flex items-start w-full gap-10 my-15">
        <div className="basis-30 lg:basis-90 ">
          <h3 className="text-h4">My Service History</h3>
          <p className="text-body-1 text-gray-700 mt-2">
            Hello, Jenny! Here you can view the status and history of all your
            past and current service requests.
          </p>
        </div>
        <div className="flex-1">
          {cards.map((card) => (
            <div className="border border-1 py-3 px-5 mb-4 shadow-sm rounded-sm" key={card.id}>
              <div className="grid grid-cols-3 items-center mb-2">
                <p className="justify-self-start font-semibold">{card.title}</p>
                <p className="justify-self-center text-center ext-gray-700">{card.issueDate}</p>
                <div className="justify-self-end text-right">
                  <p>{card.status}</p>
                </div>
              </div>
               <p className="text-gray-700">{card.description} </p>
            </div>
          ))}
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default serviceHistory;
