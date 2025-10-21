import { Button } from "@/components/ui/button";
import MonthlyContract from "./components/monthly-contract";
import TenantInformation from "./components/tenant-information";
import PropertyDetails from "./components/property-details";
import FinancialTerms from "./components/financial-terms";
import Facilities from "./components/facilities";
import UtilitiesServices from "./components/utilities-services";
import TermsandConditions from "./components/terms-conditions";
import ImportantDates from "./components/important-dates";

const RentalContract = () => {
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
      <MonthlyContract />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <TenantInformation />
        <PropertyDetails />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <FinancialTerms />
        <Facilities />
      </div>
      <UtilitiesServices />
      <TermsandConditions />
      <ImportantDates />
    </section>
  );
};

export default RentalContract;
