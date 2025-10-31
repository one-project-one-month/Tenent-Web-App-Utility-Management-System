import {Badge} from "@/components/ui/badge";
import type {Status} from "@/pages/my-billing";

const statusColors: Record<Status, string> = {
    Paid: "bg-[#58DA8F80] text-[#11321F]",
    Pending: "bg-[#F5D47080] text-[#605020]",
    Overdue: "bg-[#FFBABA80] text-[#6B1A1A]",
};

type OverviewCardProps = {
    totalAmount: number;
    createDate?: string;
    dueDate?: string;
    status: Status;
};

const OverviewCard = ({totalAmount, createDate, dueDate, status}: OverviewCardProps) => {
    const today = new Date();
    const due = new Date(dueDate || "");
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const showDueMessage = status !== "Paid";

    return (
        <article
            className="flex flex-col gap-6 bg-[#FFFAFA] rounded-lg px-6 py-8 shadow-double border border-[#E0E0E0] lg:flex-row lg:justify-between lg:items-center">
            <div className="flex flex-col gap-2">
                <p className="text-lg text-[#4F4F4F]">Current Bill</p>
                <h3 className="text-[#1955FF] text-2xl font-medium">
                    {totalAmount.toLocaleString("en-US")} MMK
                </h3>
                <p className="text-lg text-[#4F4F4F]">
                    {new Date(createDate || "").toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                    })}
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-lg text-[#4F4F4F]">Due Date</p>
                <h3 className="text-[#1955FF] text-2xl font-medium">
                    {new Date(dueDate || "").toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </h3>
                {showDueMessage && (
                    <p
                        className={`text-lg ${
                            diffDays <= 0 ? "text-[#EB5757]" : "text-[#4F4F4F]"
                        }`}
                    >
                        {diffDays > 0
                            ? `Payment due in ${diffDays} day${diffDays > 1 ? "s" : ""}`
                            : "Payment overdue"}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-2 lg:w-52">
                <p className="text-lg text-[#4F4F4F]">Status</p>
                <Badge className={`py-1 px-2 h-fit ${statusColors[status]}`}>
                    {status}
                </Badge>
            </div>
        </article>
    );
};

export default OverviewCard;
