import { Badge } from "@/components/ui/badge";
import type { ServiceStatus } from "@/types/service";
import { Loader } from "lucide-react";
import { CircleEllipsis } from "lucide-react";
import { CircleCheck } from "lucide-react";



type StatusBadgeProps = {
  status: ServiceStatus;
  className?: string;
};

const STATUS_STYLES: Record<ServiceStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800  ",
  Ongoing: "bg-blue-100 text-blue-800 ",
  Resolved: "bg-green-100 text-green-800 ",
};

const STATUS_ICONS: Record<ServiceStatus, React.ReactNode> = {
  Pending: <Loader />,
  Ongoing: <CircleEllipsis />,
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
