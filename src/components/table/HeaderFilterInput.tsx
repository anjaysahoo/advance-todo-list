import {CircleX} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"


export type FilterPayloadSelect = {
    type: 'select';
    values: string[];
    options: {value: string, label: string}[];
};

export type FilterPayloadRange = {
    type: 'range';
    max?: number | null;
    min?: number | null;
};

export type FilterPayloadString = {
    type: 'string';
    value: string | null;
};

export type FilterPayloadRadio = {
    type: 'radio';
    value: string | null;
};

export type Filters = Record<
    string,
    FilterPayloadRange | FilterPayloadString | FilterPayloadSelect | FilterPayloadRadio
>;

export default function HeaderFilterInput({
    field,
    filterType,
    filterOptions,
    filters,
    onFilterChange,
}: Readonly<{
    field: string;
    filterType: 'range' | 'string' | 'select' | 'radio' | null;
    filterOptions?: {value: string, label: string}[];
    filters: Filters;
    onFilterChange: (newFilters: Filters) => void;
}>) {
    return (
        <div className="filter-input p-2">
            {(() => {
                switch (filterType) {
                    case 'select': {
                        const filterData = filters[field] as FilterPayloadSelect | null;
                        const currentValues = filterData?.values || [];

                        return (
                            <div className="space-y-2">
                                {filterOptions?.map((option) => (
                                    <div key={option.value} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`${field}-${option.value}`}
                                            checked={currentValues.includes(option.value)}
                                            onCheckedChange={(checked) => {
                                                const newValues = checked
                                                    ? [...currentValues, option.value]
                                                    : currentValues.filter(val => val !== option.value);
                                                
                                                const newFilters: Filters = {
                                                    ...filters,
                                                    [field]: {
                                                        type: 'select',
                                                        values: newValues,
                                                        options: filterOptions || [],
                                                    },
                                                };
                                                onFilterChange(newFilters);
                                            }}
                                        />
                                        <Label htmlFor={`${field}-${option.value}`}>
                                            {option.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        );
                    }
                    case 'radio': {
                        const filterData = filters[field] as FilterPayloadRadio | null;

                        return (
                            <RadioGroup
                                value={filterData?.value || ''}
                                onValueChange={(value) => {
                                    const newFilters: Filters = {
                                        ...filters,
                                        [field]: {
                                            type: 'radio',
                                            value,
                                        },
                                    };
                                    onFilterChange(newFilters);
                                }}
                                className="space-y-2"
                            >
                                {filterOptions?.map((option) => (
                                    <div key={option.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.value} id={`${field}-${option.value}`} />
                                        <Label htmlFor={`${field}-${option.value}`}>
                                            {option.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        );
                    }
                    case 'string': {
                        const filterData = filters[field] as FilterPayloadString | null;
                        return (
                            <div className="space-y-2">
                                <Input
                                    placeholder="Search..."
                                    type="search"
                                    value={filterData?.value || ''}
                                    onChange={(event) => {
                                        const newFilters: Filters = {
                                            ...filters,
                                            [field]: {
                                                type: 'string',
                                                value: event.target.value,
                                            },
                                        };
                                        onFilterChange(newFilters);
                                    }}
                                    className="w-full"
                                />
                            </div>
                        );
                    }
                    case 'range': {
                        const filterData = filters[field] as FilterPayloadRange | null;

                        return (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Input
                                        placeholder="Min"
                                        type="number"
                                        value={filterData?.min || ''}
                                        onChange={(event) => {
                                            const newFilters: Filters = {
                                                ...filters,
                                                [field]: {
                                                    ...filterData,
                                                    type: 'range',
                                                    min: event.target.value !== ''
                                                        ? Number(event.target.value)
                                                        : null,
                                                },
                                            };
                                            onFilterChange(newFilters);
                                        }}
                                        className="w-24"
                                    />
                                    <Input
                                        placeholder="Max"
                                        type="number"
                                        value={filterData?.max || ''}
                                        onChange={(event) => {
                                            const newFilters: Filters = {
                                                ...filters,
                                                [field]: {
                                                    ...filterData,
                                                    type: 'range',
                                                    max: event.target.value !== ''
                                                        ? Number(event.target.value)
                                                        : null,
                                                },
                                            };
                                            onFilterChange(newFilters);
                                        }}
                                        className="w-24"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            const newFilters: Filters = {...filters};
                                            delete newFilters[field];
                                            onFilterChange(newFilters);
                                        }}
                                    >
                                        <CircleX className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        );
                    }
                    default:
                        return null;
                }
            })()}
        </div>
    );
}
