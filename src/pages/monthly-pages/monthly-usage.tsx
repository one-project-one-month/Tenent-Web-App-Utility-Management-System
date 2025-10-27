import BreadCrumb from "@/components/common/bread-crumb";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router";


interface UsagePageProps {
  title: string;
  buttonText?: string;
  buttonLink?: string;
  iconLink: string;
}

const MonthlyUsage = ({
  title,
  buttonText,
  buttonLink,
  iconLink,
}: UsagePageProps) => {
  

  return (
    <section className="mt-10 max-w-7xl">
      {/* Breadcrumb */}
      <BreadCrumb />

      {/* Page Title */}
      <h2 className="text-4xl font-extrabold text-center mt-12">{title}</h2>

      {/* Content Layout */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-12 gap-10">
        {/* Left Label — shown only on desktop */}
        <div className="hidden md:flex md:flex-1 md:justify-end md:pr-10">
          <h3 className="text-4xl font-extrabold leading-snug text-center md:text-left">
            Monthly <br />
            {title}
          </h3>
        </div>

        
          {/* Bottom Label — shown only on small screens */}
          <div className="flex md:hidden items-center justify-center mt-8">
            <h3 className="text-3xl font-extrabold leading-snug text-center">
              Monthly <br />
              {title}
            </h3>
          </div>
        </div>
      
      {/* Footer Buttons */}
      <div className="mt-12 flex items-center justify-between max-w-7xl mx-auto mb-10 px-4">
        <Link
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          to={iconLink}
        >
          <MoveLeft className="h-4 w-4" />
          Back
        </Link>

        {buttonText && (
          <Link to={buttonLink || ""}>
            <Button className="px-6 py-2 text-sm font-medium shadow-md text-background">
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default MonthlyUsage;
