import { useMemo } from "react";
import { useLocation } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface PageItem {
  rootName?: string;
  title: string;
  path: string;
}

type PageMapType = Record<string, PageItem[]>;

const PAGE_MAP: PageMapType = {
  overview: [
    {
      rootName: "Overview",
      title: "Overview",
      path: "/",
    },
    {
      title: "Electric Usage",
      path: "/electric-usage",
    },
    {
      title: "Water Usage",
      path: "/water-usage",
    },
    {
      title: "Wifi Usage",
      path: "/wifi-usage",
    },
  ],
  "electric-usage": [
    { rootName: "Overview", title: "Electric Usage", path: "/electric-usage" },
  ],
  "water-usage": [
    { rootName: "Overview", title: "Water Usage", path: "/water-usage" },
  ],
  "wifi-usage": [
    { rootName: "Overview", title: "Wifi Usage", path: "/wifi-usage" },
  ],
  "customer-service": [
    {
      rootName: "Customer Service",
      title: "New Request",
      path: "/customer-service",
    },
    {
      rootName: "Services History",
      title: "Services History",
      path: "/service-history",
    },
  ],
  contract: [
    {
      rootName: "Contract",
      title: "Contract Details",
      path: "/contract",
    },
  ],
  "my-billing": [
    {
      rootName: "My Billing",
      title: "Latest Bill",
      path: "/my-billing",
    },
    {
      title: "Billing History",
      path: "/billing-history",
    },
  ],
  receipt: [
    {
      rootName: "My Billing",
      title: "Receipt",
      path: "/receipt",
    },
  ],
};

const BreadCrumb = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const { rootItem, currentItem } = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const rootSegment = segments[0];
    const currentSegment = segments[segments.length - 1];

    const pageItems = PAGE_MAP[rootSegment];
    if (!pageItems) {
      return { rootItem: null, currentItem: null };
    }

    const root = pageItems[0];
    const current = pageItems.find(
      (item) => item.path === `/${currentSegment}`
    );

    return { rootItem: root, currentItem: current };
  }, [pathname]);

  if (!rootItem) {
    return null;
  }

  const displayTitle =
    pathname === rootItem.path
      ? rootItem.title
      : currentItem?.title || rootItem.title;

  return (
    <Breadcrumb className="mt-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={rootItem.path}>
            {rootItem.rootName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-primary">
            {displayTitle}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
