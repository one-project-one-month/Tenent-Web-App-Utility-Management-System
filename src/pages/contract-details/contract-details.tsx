import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// import PropTypes from 'prop-types';

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
    <div className="px-4 lg:px-0 flex flex-col gap-1 lg:gap-0">
      <section className="flex flex-col pt-9 gap-11 md:gap-14 xl:gap-14 py-0 md:py-14 xl:py-14 px-0 md:px-8 xl:px-0">
        <Breadcrumb aria-label="Breadcrumb navigation">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="hover:text-blue-500">
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
        <h1 className="text-center text-4xl md:text-5xl font-bold text-[#333333]">
          Contract Details
        </h1>
        <div className="flex flex-col gap-11 md:gap-[clamp(2rem,18vw,7rem)] md:flex-row md:py-9 md:mx-auto">
          <header className="text-center md:text-left flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-medium text-[#333333]">
              My Contract
            </h2>
            <p className="text-xl md:text-2xl font-medium text-[#4F4F4F]">
              Here's your contract
            </p>
          </header>
          <article className="bg-[#FFFAFA] rounded-[8px] px-3 lg:px-5 py-4 w-full md:w-[45vw] md:max-w-[558px]">
            <div className="border-b border-b-[#E0E0E0] pb-3">
              {contractFields.map((field, index) => (
                <dl
                  key={index}
                  className="flex justify-between items-center py-2"
                >
                  <dt className="text-xl lg:text-2xl text-[#828282]">
                    {field.label}:
                  </dt>
                  <dd className="text-xl lg:text-2xl font-medium text-[#4F4F4F]">
                    {field.value}
                  </dd>
                </dl>
              ))}
            </div>
            <div className="flex justify-between items-center pt-3 pb-2">
              <p className="text-xl lg:text-2xl text-[#828282]">
                Total Amount:
              </p>
              <p className="text-xl lg:text-2xl font-medium text-[#4F4F4F]">
                600,000 MMK
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
