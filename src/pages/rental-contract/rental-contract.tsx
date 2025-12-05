import { Button } from "@/components/ui/button";
import MonthlyContract from "./components/monthly-contract";
import TenantInformation from "./components/tenant-information";
import PropertyDetails from "./components/property-details";
import FinancialTerms from "./components/financial-terms";
import Facilities from "./components/facilities";
import UtilitiesServices from "./components/utilities-services";
import TermsandConditions from "./components/terms-conditions";
import ImportantDates from "./components/important-dates";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useTenantContractQuery } from "@/hooks/use-tenant-contract";
import { FourSquare } from "react-loading-indicators";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ContractPDF from "./contract-pdf/contract-pdf";

const RentalContract = () => {
  const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId);

  const {
    data: contracts,
    isLoading,
    isError,
  } = useTenantContractQuery(tenantId as string);

  const contract = Array.isArray(contracts) ? contracts[0] : contracts;

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <FourSquare
          color="#2563eb"
          size="medium"
          text="Loading Contract..."
          textColor=""
        />
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <h2 className="text-2xl font-bold text-primary">
          No Contract For this Tenant Yet!
        </h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <h2 className="text-2xl font-bold text-destructive">
          Database Response Error
        </h2>
      </div>
    );
  }

  const { tenant, room, contractType, createdDate, expiryDate } = contract;

  return (
    <section className="min-h-screen max-w-5xl mx-auto flex flex-col justify-between">
      <div className="flex justify-between items-center flex-wrap gap-3 mb-5 mt-6 w-full">
        <div>
          <h2 className="text-2xl font-bold">Rental Contract</h2>
          <p className="text-md">
            View your lease agreement and contract details
          </p>
        </div>
        <PDFDownloadLink
          document={<ContractPDF contract={contract} />}
          fileName={`${tenant.name}-contract.pdf`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="text-white text-sm w-full md:w-auto">
                <img src="src/assets/download.svg" alt="contract" />
                Download PDF
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download Contract PDF</p>
            </TooltipContent>
          </Tooltip>
        </PDFDownloadLink>
      </div>
      <MonthlyContract startDate={createdDate} expiryDate={expiryDate} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <TenantInformation
          tenant={tenant}
          room={room}
          startDate={createdDate}
        />
        <PropertyDetails room={room} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <FinancialTerms
          price={contractType.price}
          duration={contractType.duration}
          expiryDate={expiryDate}
        />
        <Facilities facilities={contractType.facilities} />
      </div>
      <UtilitiesServices facilities={contractType.facilities} />
      <TermsandConditions />
      <ImportantDates startDate={createdDate} expiryDate={expiryDate} />
    </section>
  );
};

export default RentalContract;
