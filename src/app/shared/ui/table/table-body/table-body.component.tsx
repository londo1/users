import React from "react";
import { TableBodyProperties } from "../table.model";

export function TableBody<T>({ slice, columns }: TableBodyProperties<T>) {
  return (
    <tbody>
      {slice.map((element) => (
        <tr key={element.id}>
          {columns.map((column) => (
            <td key={`${element.id}-${column.key}`}>
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
