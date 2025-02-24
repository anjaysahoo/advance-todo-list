import { useState, useRef, useEffect } from 'react';
import {ArrowDownNarrowWide, ArrowUpDown, ArrowUpWideNarrow, Filter} from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import HeaderFilterInput, {Filters} from "../table/HeaderFilterInput.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export type SortDirection = 'asc' | 'desc';
type ColumnDef<T> = Readonly<{
    label: string;
    key: string;
    renderCell: (row: T) => React.ReactNode;
    comparator: (a: T, b: T, sortDirection: SortDirection) => number | null;
    filterType: 'string' | 'range' | 'select' | 'radio' | null;
    filterOptions?: {value: string, label: string}[];
}>;
export type Columns<T> = ReadonlyArray<ColumnDef<T>>;

function filterData<T>(data: Array<T>, filters: Filters) {
    return data.filter((row) =>
        Object.entries(filters)
            .map(([key, filterPayload]) => {
                const value = (row as any)[key];

                switch (filterPayload.type) {
                    case 'select': {
                        if (filterPayload.values.length === 0) {
                            return true;
                        }
                        return filterPayload.values.includes(value);
                    }
                    case 'radio': {
                        if (filterPayload.value === 'clear') {
                            return true;
                        }

                        return (filterPayload.value === 'checked' && value === true) || (filterPayload.value === 'unchecked' && value === false);
                    }
                    case 'string': {
                        if (
                            filterPayload.value == null ||
                            filterPayload.value === ''
                        ) {
                            return true;
                        }

                        return (
                            (value as string)
                                .toLocaleLowerCase()
                                .indexOf(
                                    filterPayload.value.toLocaleLowerCase(),
                                ) !== -1
                        );
                    }
                    case 'range': {
                        // Smaller than min value.
                        if (
                            filterPayload.min != null &&
                            value < filterPayload.min
                        ) {
                            return false;
                        }

                        // Larger than max value.
                        if (
                            filterPayload.max != null &&
                            value > filterPayload.max
                        ) {
                            return false;
                        }

                        return true;
                    }
                }
            })
            .every((result) => result),
    );
}

function sortData<T>(
    data: Array<T>,
    columns: Columns<T>,
    field: string | null,
    direction: SortDirection,
) {
    const dataClone = data.slice();
    const comparator = columns.find(
        (column) => column.key === field,
    )?.comparator;

    if (comparator == null) {
        return dataClone;
    }

    return dataClone.sort((a, b) =>
        comparator(a, b, direction),
    );
}

function paginateData<T>(
    data: Array<T>,
    page: number,
    pageSize: number,
) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const pageData = data.slice(start, end);
    const maxPages = Math.ceil(data.length / pageSize);
    return { pageData, maxPages };
}

function isFilterActive(field: string, filters: Filters){
    if(!filters[field])
        return false;

    if(filters[field].type === 'radio')
        return filters[field].value !== 'clear';
    else if(filters[field].type === 'select')
        return filters[field].values.length > 0;
    else if(filters[field].type === 'range')
        return filters[field].min !== null || filters[field].max !== null;
    else if(filters[field].type === 'string')
        return filters[field].value !== null && filters[field].value !== '';

    return false;
}

function CustomizableTable<T>({ data, columns }: Readonly<{
  data: Array<T>;
  columns: Columns<T>;
}>) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortField, setSortField] = useState<string | null>(
        null,
    );
    const [sortDirection, setSortDirection] =
        useState<SortDirection>('asc');

  const [filters, setFilters] = useState<Filters>({});
  const [activeFilterCard, setActiveFilterCard] = useState<string | null>(null);
  const filterCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterCardRef.current && !filterCardRef.current.contains(event.target as Node)) {
        setActiveFilterCard(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    const filteredData = filterData(data, filters);
    const sortedData = sortData(
        filteredData,
        columns,
        sortField,
        sortDirection,
    );
    const { maxPages, pageData } = paginateData(
        sortedData,
        page,
        pageSize,
    );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(({ label, key, filterType, filterOptions }) => (
              <TableHead 
                key={key}
              >
                <div className="flex items-center gap-2">
                  <span>{label}</span>
                  <div className="flex items-center gap-1 cursor-pointer">
                    {filterType && (
                      <Filter
                        className={cn(
                          "h-4 w-4",
                            isFilterActive(key, filters) && "text-blue-600"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveFilterCard(
                            activeFilterCard === key ? null : key
                          );
                        }}
                      />
                    )}
                      {
                          filterType && (
                              <div
                                  className={cn(
                                  "h-4 w-4",
                                  sortField === key && "text-blue-600")}
                                  onClick={() => {
                                      if (sortField !== key) {
                                          setSortField(key);
                                          setSortDirection('asc');
                                      } else {
                                          setSortDirection(
                                              sortDirection === 'asc'
                                                  ? 'desc'
                                                  : 'asc',
                                          );
                                      }
                                      setPage(1);
                                  }}
                              >
                                  {sortField !== key && <ArrowUpDown className={cn("h-4 w-4")}/>}
                                  {sortField === key && sortDirection === 'asc' && <ArrowDownNarrowWide className={cn("h-4 w-4")}/>}
                                  {sortField === key && sortDirection === 'desc' && <ArrowUpWideNarrow   className={cn("h-4 w-4")}/>}
                              </div>
                          )
                      }

                  </div>
                </div>
                {activeFilterCard === key && (
                  <Card 
                    ref={filterCardRef}
                    className="absolute mt-2 p-4 shadow-lg z-50"
                  >
                    <HeaderFilterInput
                        field={key}
                        filterType={filterType}
                        filters={filters}
                        filterOptions={filterOptions}
                        onFilterChange={(newFilters) => {
                            setFilters(newFilters);
                            setPage(1);
                        }}
                    />
                  </Card>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageData.map((item) => (
            <TableRow key={item.id}>
              {columns.map(({ key, renderCell }) => (
                <TableCell key={key}>
                    {renderCell(item)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
        </Select>

    </div>
  );
}

export default CustomizableTable;
