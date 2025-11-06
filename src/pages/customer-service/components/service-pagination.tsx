import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type ServicePaginationType = {
    totalPages: number,
    currentPage: number,
    setCurrentPage: (page: number) => void
}

const ServicePagination = (
    { totalPages, currentPage, setCurrentPage }
        : ServicePaginationType) => {
    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages!) return;
        setCurrentPage(page);
    };
    return (
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
                                className={`${page === currentPage && "bg-primary text-white"}`}
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
    )
}

export default ServicePagination