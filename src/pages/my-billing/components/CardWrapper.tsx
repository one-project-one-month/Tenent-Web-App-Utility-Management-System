import type { ReactNode } from "react";

const cardStyle =
  "flex flex-col gap-6 lg:gap-8 p-4 lg:py-8 rounded-lg shadow-double bg-[#FFFAFA] border border-[#E0E0E0]";

interface CardWrapperProps {
  icon: string;
  title: string;
  description: string;
  children: ReactNode;
}

const CardWrapper = ({
  icon,
  title,
  description,
  children,
}: CardWrapperProps) => (
  <article className={cardStyle}>
    <header className="flex flex-col gap-1">
      <div className="flex gap-3 py-2">
        <img src={icon} alt={`${title} Icon`} />
        <p className="text-lg font-medium text-[#333333]">{title}</p>
      </div>
      <p className="text-base text-[#4F4F4F]">{description}</p>
    </header>
    {children}
  </article>
);

export default CardWrapper;
