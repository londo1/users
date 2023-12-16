import React, { useState } from "react";
import { useTable } from "./useTable";
import { TableFooter } from "./table-footer/table-footer.component";
import { TableProperties } from "./table.model";
import { TableFilters } from "./table-filters/table-filters.component";
import styles from "./table.styles.module.css";

export function Table<T>({
  title,
  tableElements,
  columns,
  pageSize,
  filterFields,
}: TableProperties<T>) {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(tableElements, page, pageSize);

  return (
    <div className={styles["table-container"]}>
      <table>
        <thead>
          <tr>
            <th colSpan={columns.length}>{title}</th>
          </tr>

          <tr>
            <th colSpan={columns.length}>
              <TableFilters filterFields={filterFields}></TableFilters>
            </th>
          </tr>

          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
                className={styles["column-header"]}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

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

        <tfoot>
          <tr>
            <td colSpan={columns.length}>
              <TableFooter
                range={range}
                slice={slice}
                setPage={setPage}
                page={page}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
