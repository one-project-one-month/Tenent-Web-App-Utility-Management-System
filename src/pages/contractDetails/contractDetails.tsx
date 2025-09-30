import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ContractDetails() {
  const contractFields = [
    { label: "Name", value: "Jenny Wilson" },
    { label: "Your Id", value: "T-0001" },
    { label: "Email", value: "Jenny4207@gmail.com" },
    { label: "Ph Number", value: "09 123 456 789" },
    { label: "Contract Type", value: "Monthly" },
    { label: "Start Contract", value: "8.July.2025" },
    { label: "End Contract", value: "8.August.2025" },
  ];
  return (
    <div className="py-14 flex flex-col gap-14">
      <Breadcrumb aria-label="Breadcrumb navigation">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Contract</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-blue-500">
              Contract Details
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-center text-h1 font-bold text-[#333333]">
        Contract Details
      </h1>
      <div className="flex gap-5 py-9 w-[964px] mx-auto">
        <div className="w-[386px]">
          <h2 className="text-h4 font-semibold text-[#333333]">My Contract</h2>
          <p className="text-sub-heading font-medium leading-9 text-[#4F4F4F]">
            Here's your contract
          </p>
        </div>
        <div className="bg-white rounded-[8px] shadow py-4 px-5 w-[558px]">
          <div className="border-b border-b-[#E0E0E0] pb-3">
            {contractFields.map((field, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2"
              >
                <p className="text-sub-heading text-[#828282] w-[210px]">
                  {field.label}:
                </p>
                <p className="text-sub-heading font-medium text-[#4F4F4F]">
                  {field.value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-3 pb-2">
            <p className="text-sub-heading text-[#828282] w-[210px]">
              Total Amount:
            </p>
            <p className="text-sub-heading font-medium text-[#4F4F4F]">
              600,000 MMK
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ContractDetails.propTypes = {
//   contract: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired,
//     contractType: PropTypes.string.isRequired,
//     startDate: PropTypes.string.isRequired,
//     endDate: PropTypes.string.isRequired,
//     totalAmount: PropTypes.string.isRequired,
//   }).isRequired,
// };
