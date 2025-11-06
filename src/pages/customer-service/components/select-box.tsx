import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
export type itemType = {
    value: string,
    label: string
}
type SelectBoxType = {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    items: itemType[],
    className?: string
}

const SelectBox = ({ value, onChange, placeholder, items, className }: SelectBoxType) => {
    return (
        <Select
            onValueChange={onChange}
            value={value ?? ''}
        >
            <SelectTrigger className={cn(className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-input">
                {
                    items.map((item, i) => (
                        <SelectItem key={i} value={item.value}>{item.label}</SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}

export default SelectBox