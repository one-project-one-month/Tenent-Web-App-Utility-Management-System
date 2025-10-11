import { useState, useMemo, useEffect } from "react";
import { Download, Eye } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

type Status = "Paid" | "Pending";

interface HistoryField {
  ID: string;
  date: string;
  name: string;
  email: string;
  amount: string;
  status: Status;
}

interface HeaderField {
  tableHead: string;
}

const headerField: HeaderField[] = [
  { tableHead: "Receipt ID" },
  { tableHead: "Date" },
  { tableHead: "Name" },
  { tableHead: "Amount" },
  { tableHead: "Status" },
  { tableHead: "Action" },
];

const historyField: HistoryField[] = [
  {
    ID: "REC-2025-001",
    date: "July 25, 2025",
    name: "Jenny Wilson",
    email: "Jenny4207@gmail.com",
    amount: "642,000 MMK",
    status: "Paid",
  },
  {
    ID: "REC-2025-002",
    date: "August 25, 2025",
    name: "Alice Johnson",
    email: "alice@gmail.com",
    amount: "600,000 MMK",
    status: "Paid",
  },
  {
    ID: "REC-2025-003",
    date: "September 5, 2025",
    name: "Michael Brown",
    email: "mikeb@gmail.com",
    amount: "550,000 MMK",
    status: "Pending",
  },
  {
    ID: "REC-2025-004",
    date: "September 10, 2025",
    name: "Sarah Kim",
    email: "sarahk@gmail.com",
    amount: "670,000 MMK",
    status: "Paid",
  },
  {
    ID: "REC-2025-005",
    date: "September 15, 2025",
    name: "David Lee",
    email: "dlee@protonmail.com",
    amount: "580,000 MMK",
    status: "Paid",
  },
  {
    ID: "REC-2025-006",
    date: "September 20, 2025",
    name: "Emma Garcia",
    email: "emma.garcia@gmail.com",
    amount: "615,000 MMK",
    status: "Pending",
  },
  {
    ID: "REC-2025-007",
    date: "September 25, 2025",
    name: "Olivia Nguyen",
    email: "olivia.n@gmail.com",
    amount: "640,000 MMK",
    status: "Paid",
  },
  {
    ID: "REC-2025-008",
    date: "September 28, 2025",
    name: "Ethan Martinez",
    email: "ethanm@gmail.com",
    amount: "700,000 MMK",
    status: "Paid",
  },
  {
    ID: "REC-2025-009",
    date: "October 1, 2025",
    name: "Sophia White",
    email: "sophiaw@icloud.com",
    amount: "610,000 MMK",
    status: "Pending",
  },
  {
    ID: "REC-2025-010",
    date: "October 3, 2025",
    name: "James Anderson",
    email: "james@yahoo.com",
    amount: "580,000 MMK",
    status: "Paid",
  },
  {
    ID: "REC-2025-011",
    date: "October 7, 2025",
    name: "Liam Harris",
    email: "liamh@gmail.com",
    amount: "625,000 MMK",
    status: "Pending",
  },
  {
    ID: "REC-2025-012",
    date: "October 9, 2025",
    name: "Chloe Brown",
    email: "chloeb@live.com",
    amount: "660,000 MMK",
    status: "Paid",
  },
];

const statusColors: Record<Status, string> = {
  Paid: "bg-[#ACECC7] text-green-800",
  Pending: "bg-[#FFD1D1] text-red-800",
};

const itemsPerPage = 4;

const BillingHistory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const navigate = useNavigate();

  const sortedHistory = useMemo(() => {
    return [...historyField].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }, []);

  const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    if (
      pageFromUrl !== currentPage &&
      pageFromUrl > 0 &&
      pageFromUrl <= totalPages
    ) {
      setCurrentPage(pageFromUrl);
    }
  }, [searchParams, totalPages]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedHistory.slice(start, start + itemsPerPage);
  }, [currentPage, sortedHistory]);

  const headerFieldsMemo = useMemo(() => headerField, []);

  const renderPaginationItems = () => {
    const items: React.ReactNode[] = [];
    const pagesToShow = new Set<number>();
    const isBoundary = (page: number) => page === 1 || page === totalPages;
    const isNearCurrent = (page: number) => Math.abs(page - currentPage) <= 1;

    for (let i = 1; i <= totalPages; i++) {
      if (isNearCurrent(i) || isBoundary(i)) {
        pagesToShow.add(i);
      }
    }

    const sortedPages = Array.from(pagesToShow).sort((a, b) => a - b);
    let lastPage = 0;

    sortedPages.forEach((page) => {
      if (lastPage > 0 && page > lastPage + 1) {
        items.push(
          <PaginationItem key={`ellipsis-${lastPage}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            href={`?page=${page}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(page);
              setSearchParams({ page: page.toString() });
            }}
            isActive={currentPage === page}
            aria-current={currentPage === page ? "page" : undefined}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
      lastPage = page;
    });

    return items;
  };

  return (
    <section
      className="flex flex-col gap-8"
      aria-label="Billing History Section"
    >
      <div className="flex flex-col gap-6 lg:gap-14 xl:gap-14 xl:ml-28">
        <header className="flex flex-col gap-2 lg:gap-11 text-center lg:text-left lg:pt-9">
          <h2 className="text-h2 text-[#333333]" id="billing-title">
            My Billing
          </h2>
          <p className="text-h4 text-[#4F4F4F]">Here's your Billing History</p>
        </header>
        <div className="rounded-[8px] lg:ml-32">
          <Table aria-label="Billing History Table">
            <TableHeader className="bg-[#EBEBEB]">
              <TableRow>
                {headerFieldsMemo.map((items, index) => (
                  <TableHead className="py-2 text-base" key={index}>
                    {items.tableHead}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#FFFAFA]">
              {paginatedData.map((item) => (
                <TableRow key={item.ID}>
                  <TableCell className="py-6 text-base">{item.ID}</TableCell>
                  <TableCell className="py-6 text-base">{item.date}</TableCell>
                  <TableCell className="py-6">
                    <div className="flex flex-col items-start justify-center">
                      <span className="text-base font-medium">{item.name}</span>
                      <span className="text-base text-gray-500">
                        {item.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 text-base">
                    {item.amount}
                  </TableCell>
                  <TableCell className="py-6 text-base">
                    <span
                      className={`rounded-[8px] px-3 py-1 font-medium ${
                        statusColors[item.status]
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        aria-label={`View receipt ${item.ID}`}
                        title="View Receipt"
                        onClick={() => navigate("/receipt")}
                      >
                        <Eye />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        aria-label={`Download receipt ${item.ID}`}
                        className="px-3 py-2 bg-[#3E70FF]"
                        title="Download Receipt"
                      >
                        <Download />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${currentPage - 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  const newPage = currentPage > 1 ? currentPage - 1 : 1;
                  setCurrentPage(newPage);
                  setSearchParams({ page: newPage.toString() });
                }}
                aria-disabled={currentPage === 1}
                aria-label="Go to previous page"
              />
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem>
              <PaginationNext
                href={`?page=${currentPage + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  const newPage =
                    currentPage < totalPages ? currentPage + 1 : totalPages;
                  setCurrentPage(newPage);
                  setSearchParams({ page: newPage.toString() });
                }}
                aria-disabled={currentPage === totalPages}
                aria-label="Go to next page"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default BillingHistory;
