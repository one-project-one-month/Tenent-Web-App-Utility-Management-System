import { useNavigate } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ContractField {
  label: string;
  value: string;
}

export default function ContractDetails() {
  const navigate = useNavigate();

  // const [contractData, setContractData] = useState<ContractField[] | null>(null);

  // useEffect(() => {
  //   fetch("/api/contracts/123") // example endpoint
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setContractData(data);
  //     })
  //     .catch((err) => console.error("Error fetching contract:", err));
  // }, []);

  // if (!contractData) return <p>Loading...</p>; // example handle loading state

  const contractFields: ContractField[] = [
    { label: "Name", value: "Jenny Wilson" }, // value: contractData.name
    { label: "Your Id", value: "T-0001" },
    { label: "Email", value: "Jenny4207@gmail.com" },
    { label: "Ph Number", value: "09 123 456 789" },
    { label: "Contract Type", value: "Monthly" },
    { label: "Start Contract", value: "July.8.2025" },
    { label: "End Contract", value: "August.11.2025" },
  ];

  return (
    <div className="px-4 lg:px-0 flex flex-col gap-1 lg:gap-0">
      <section className="flex flex-col pt-9 gap-11 lg:gap-14 py-14 lg:px-8 xl:px-0">
        {/* Breadcrumb */}
        <Breadcrumb aria-label="Breadcrumb navigation">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  navigate("/");
                }}
                className="hover:text-blue-500"
              >
                Contract
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-blue-500">
                Contract Details
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Title */}
        <h1 className="text-center text-h1 font-bold text-[#333333]">
          Contract Details
        </h1>

        {/* Contract Content */}
        <div className="flex flex-col gap-6 xl:gap-5 lg:flex-row lg:py-9 lg:mx-auto">
          {/* Contract Header */}
          <header className="text-center lg:text-left flex flex-col gap-2 xl:w-[350px]">
            <h2 className="text-2xl md:text-4xl font-medium text-[#333333]">
              My Contract
            </h2>
            <p className="text-xl md:text-2xl font-medium text-[#4F4F4F]">
              Here's your contract
            </p>
          </header>

          {/* Contract Details Card */}
          <article className="bg-[#FFFAFA] rounded-[8px] px-3 lg:px-5 py-4 w-full lg:w-[45vw] lg:max-w-[550px]">
            {/* Fields */}
            <div className="border-b border-b-[#E0E0E0] pb-3">
              {contractFields.map((field, index) => (
                <dl
                  key={index}
                  className="flex justify-between items-center py-2"
                >
                  <dt className="text-xl md:text-2xl text-[#828282]">
                    {field.label}:
                  </dt>
                  <dd
                    role="definition"
                    className="text-xl md:text-2xl font-medium text-[#4F4F4F]"
                  >
                    {field.value}
                  </dd>
                </dl>
              ))}
            </div>

            {/* Total Amount */}
            <dl className="flex justify-between items-center pt-3 pb-2">
              <dt className="text-xl md:text-2xl text-[#828282]">
                Total Amount:
              </dt>
              <dd
                role="definition"
                className="text-xl md:text-2xl font-medium text-[#4F4F4F]"
              >
                600,000 MMK
                {/* Currently the amount is hardcoded as a string for display purposes.
                  Once this connects with real API data, I’ll replace it with {contractData.totalAmount.toLocaleString()} MMK for proper number formatting */}
              </dd>
            </dl>
          </article>
        </div>
      </section>
    </div>
  );
}
