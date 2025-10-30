interface BillingCardProps {
    icon: string;
    title: string;
    amount: number;
}

const BillingCard = ({icon, title, amount}: BillingCardProps) => (
    <div className="bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg flex justify-between items-center px-3 py-4">
        <div className="flex gap-3 items-center">
            <div className="rounded-lg bg-[#3E70FF] py-2 px-3">
                <img src={icon} alt={`${title} Icon`}/>
            </div>
            <p className="text-lg font-medium text-[#4F4F4F]">{title}</p>
        </div>
        <p className="text-xl font-medium text-[#333333]">
            {amount.toLocaleString() ?? 0} MMK
        </p>
    </div>
);

export default BillingCard;