import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";
import { CircleEllipsis } from "lucide-react";
import { CircleCheck } from "lucide-react";

type Status = "Pending" | "In-progress" | "Resolved";

type StatusBadgeProps = {
  status: Status;
  className?: string;
};

const STATUS_STYLES: Record<Status, string> = {
  Pending: "bg-yellow-100 text-yellow-800  ",
  "In-progress": "bg-blue-100 text-blue-800 ",
  Resolved: "bg-green-100 text-green-800 ",
};

const STATUS_ICONS: Record<Status, React.ReactNode> = {
  Pending: <Loader />,
  "In-progress": <CircleEllipsis />,
  Resolved: <CircleCheck />,
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles = STATUS_STYLES[status] ?? "";
  const icon = STATUS_ICONS[status];
  return (
    <Badge className={[styles, className].filter(Boolean).join(" ")}>
      {icon}
      {status}
    </Badge>
  );
}
