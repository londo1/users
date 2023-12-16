import React from "react";
import { TableBodyProperties } from "../table.model";

export function TableBody<T>({
  slice,
  columns,
  tableId,
}: TableBodyProperties<T>) {
  return (
    <tbody>
      {slice.map((element) => (
        <tr key={`${tableId}-${element.id}`}>
          {columns.map((column) => (
            <td key={`${tableId}-${column.key}-${element.id}`}>
              {column.render
                ? column.render(column, element)
                : element[column.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
