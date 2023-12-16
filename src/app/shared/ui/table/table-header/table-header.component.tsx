import { TableHeaderProperties } from "../table.model";
import { TableFilters } from "./table-filters/table-filters.component";
import React from "react";

export function TableHeader<T>({
  columns,
  title,
  filters,
  tableId,
}: TableHeaderProperties<T>) {
  return (
    <thead>
      <tr>
        <th colSpan={columns.length}>{title}</th>
      </tr>

      <tr>
        <th colSpan={columns.length}>
          <TableFilters filterFields={filters}></TableFilters>
        </th>
      </tr>

      <tr>
        {columns.map((column) => (
          <th
            key={`${tableId}-${column.key}`}
            style={{ width: column.width, textAlign: "left" }}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
