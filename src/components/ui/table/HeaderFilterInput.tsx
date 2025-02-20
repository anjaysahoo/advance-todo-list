export type FilterPayloadSelect = {
    type: 'select';
    values: string[];
    options: string[];
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

export type Filters = Record<
    string,
    FilterPayloadRange | FilterPayloadString | FilterPayloadSelect
>;

export default function HeaderFilterInput({
    field,
    filterType,
    filterOptions,
    filters,
    onFilterChange,
}: Readonly<{
    field: string;
    filterType: 'range' | 'string' | 'select';
    filterOptions?: string[];
    filters: Filters;
    onFilterChange: (newFilters: Filters) => void;
}>) {
    return (
        <div className="filter-input">
            {(() => {
                switch (filterType) {
                    case 'select': {
                        const filterData = filters[field] as FilterPayloadSelect | null;

                        return (
                            <>
                                {filterOptions?.map(option => (
                                    <div>
                                        <input
                                            type="checkbox"
                                            name={field}
                                            id={`${field}-${option}`}
                                            value={option}
                                            checked={filterData?.values?.includes(option)}
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                let newFilters: Filters;
                                                if(event.target.checked) {
                                                    const newValues = [...filterData?.values || [], value];
                                                    newFilters = {
                                                        ...filters,
                                                        [field]: {
                                                            type: 'select',
                                                            values: newValues,
                                                            options: filterOptions || [],
                                                        },
                                                    };
                                                }
                                                else {
                                                    const newValues = filterData?.values?.filter(val => val !== value);
                                                    newFilters = {
                                                        ...filters,
                                                        [field]: {
                                                            type: 'select',
                                                            values: newValues || [],
                                                            options: filterOptions || [],
                                                        },
                                                    };
                                                }
                                                onFilterChange(newFilters);
                                            }}
                                        />
                                        <label
                                            key={option}
                                            htmlFor={`${field}-${option}`}
                                        >
                                            {option}
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
