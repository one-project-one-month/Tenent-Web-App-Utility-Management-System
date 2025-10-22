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

const RentalContract = () => {
  const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId);
  // const tenantId = "018147a4-bf5e-45e5-a3a1-a3e0fea3e070";
  const {
    data: contract,
    isLoading,
    isError,
  } = useTenantContractQuery(tenantId as string);

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

  if (isError || !contract) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <h2 className="text-2xl font-bold text-primary">
          No Contract For this Tenant Yet!
        </h2>
      </div>
    );
  }

  console.log(contract);
  const { tenant, room, contractType, createdDate, expiryDate } = contract;

  return (
    <section className="min-h-screen max-w-5xl mx-auto flex flex-col justify-between">
      <div className="flex justify-between items-center flex-wrap gap-3 mb-5 mt-6 w-full">
        <div>
          <h2 className="text-2xl font-bold">Rental Contract</h2>
          <p className="text-md font-bold">
            View your lease agreement and contract details
          </p>
        </div>
        <Button className="text-white text-sm w-full md:w-auto">
          <img src="src/assets/download.svg" alt="contract" />
          Download PDF
        </Button>
      </div>
      <MonthlyContract
        contractTypeName={contractType.name}
        startDate={createdDate}
        expiryDate={expiryDate}
      />
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
      <UtilitiesServices />
      <TermsandConditions />
      <ImportantDates startDate={createdDate} expiryDate={expiryDate} />
    </section>
  );
};

export default RentalContract;
