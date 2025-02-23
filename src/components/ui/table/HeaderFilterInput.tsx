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
        <div className="filter-input">
            {(() => {
                switch (filterType) {
                    case 'select': {
                        const filterData = filters[field] as FilterPayloadSelect | null;
                        const currentValues = filterData?.values || [];

                        return (
                            <>
                                {filterOptions?.map((option) => (
                                    <div key={option.value}>
                                        <input
                                            type="checkbox"
                                            name={field}
                                            id={`${field}-${option.value}`}
                                            value={option.value}
                                            checked={currentValues.includes(option.value)}
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                const newValues = event.target.checked 
                                                    ? [...currentValues, value]
                                                    : currentValues.filter(val => val !== value);
                                                
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
                                        <label htmlFor={`${field}-${option.value}`}>
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </>
                        );
                    }
                    case 'radio': {
                        const filterData = filters[field] as FilterPayloadRadio | null;

                        return (
                            <>
                                {filterOptions?.map((option) => (
                                    <div key={option.value}>
                                        <input
                                            type="radio"
                                            name={field}
                                            id={`${field}-${option.value}`}
                                            value={option.value}
                                            checked={filterData?.value === option.value}
                                            onChange={(event) => {
                                                const newFilters: Filters = {
                                                    ...filters,
                                                    [field]: {
                                                        type: 'radio',
                                                        value: event.target.value,
                                                    },
                                                };

                                                onFilterChange(newFilters);
                                            }}
                                        />
                                        <label
                                            key={option.value}
                                            htmlFor={`${field}-${option.value}`}
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </>
                        );
                    }
                    case 'string': {
                        const filterData = filters[
                            field
                            ] as FilterPayloadString | null;
                        return (
                            <input
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
                            />
                        );
                    }
                    case 'range': {
                        const filterData = filters[
                            field
                            ] as FilterPayloadRange | null;

                        return (
                            <div className="filter-input--range">
                                <input
                                    placeholder="Min"
                                    type="number"
                                    value={filterData?.min || ''}
                                    onChange={(event) => {
                                        const newFilters: Filters = {
                                            ...filters,
                                            [field]: {
                                                ...filterData,
                                                type: 'range',
                                                min:
                                                    event.target.value !== ''
                                                        ? Number(event.target.value)
                                                        : null,
                                            },
                                        };

                                        onFilterChange(newFilters);
                                    }}
                                />
                                <input
                                    placeholder="Max"
                                    type="number"
                                    value={filterData?.max || ''}
                                    onChange={(event) => {
                                        const newFilters: Filters = {
                                            ...filters,
                                            [field]: {
                                                ...filterData,
                                                type: 'range',
                                                max:
                                                    event.target.value !== ''
                                                        ? Number(event.target.value)
                                                        : null,
                                            },
                                        };

                                        onFilterChange(newFilters);
                                    }}
                                />
                            </div>
                        );
                    }
                }
            })()}
        </div>
    );
}
