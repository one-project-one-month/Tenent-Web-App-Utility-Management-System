import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {DialogTrigger} from "@/components/ui/dialog";
import {Badge} from "@/components/ui/badge";
import type {Status} from "@/pages/my-billing";

const tableCellStyle = "w-[156px] text-base text-[#333333] text-center";
const statusColors: Record<Status, string> = {
    Paid: "bg-[#58DA8F80] text-[#11321F]",
    Pending: "bg-[#F5D47080] text-[#605020]",
    Overdue: "bg-[#F87171]/20 text-[#B91C1C]",
};

interface InvoiceField {
    ID?: string;
    date: string;
    due_date: string;
    amount: number;
    status?: Status;
}

interface HeaderField {
    tableHead: string;
}

interface InvoiceTableProps {
    headerField: HeaderField[];
    invoiceData: InvoiceField[];
    onAction?: (id: string | undefined) => void;
}

const InvoiceTable = ({
                          headerField,
                          invoiceData,
                          onAction,
                      }: InvoiceTableProps) => (
    <Table
        aria-label="Usage History Table"
        className="table-fixed w-full border-collapse transition-opacity duration-300"
    >
        <TableHeader className="bg-[#EBEBEB]">
            <TableRow>
                {headerField.map((items, index) => (
                    <TableHead
                        key={index}
                        className="w-[156px] h-11 p-2 text-h5 text-center text-[#333333]"
                        scope="col"
                    >
                        {items.tableHead}
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
        <TableBody className="bg-[#FFFAFA]">
            {invoiceData.map((item) => (
                <TableRow
                    key={item.ID}
                    className="h-[52px] border-none transition-opacity duration-300 opacity-100"
                >
                    <TableCell className={tableCellStyle}>{item.ID}</TableCell>
                    <TableCell className={tableCellStyle}>{item.date}</TableCell>
                    <TableCell className={tableCellStyle}>{item.due_date}</TableCell>
                    <TableCell className={tableCellStyle}>
                        {item.amount.toLocaleString()} MMK
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                        <Badge
                            className={`rounded-lg px-2 py-1 text-base ${
                                statusColors[item.status as Status]
                            }`}
                        >
                            {item.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="w-[156px] text-center">
                        <div className="flex justify-center">
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => onAction?.(item.ID)}
                                    disabled={item.status !== "Paid"}
                                >
                                    View
                                </Button>
                            </DialogTrigger>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default InvoiceTable;
