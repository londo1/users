import React, { useState } from "react";
import { useTable } from "./useTable";
import { TableFooter } from "./table-footer/table-footer.component";
import { TableProperties } from "./table.model";
import styles from "./table.styles.module.css";
import { TableHeader } from "./table-header/table-header.component";
import { TableBody } from "./table-body/table-body.component";

export function Table<T>({
  title,
  tableElements,
  columns,
  pageSize,
  filterFields,
  tableId,
}: TableProperties<T>) {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(tableElements, page, pageSize);

  return (
    <div className={styles["table-container"]}>
      <table>
        <TableHeader
          tableId={tableId}
          columns={columns}
          title={title}
          filters={filterFields}
        />

        <TableBody tableId={tableId} columns={columns} slice={slice} />

        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          columnsCount={columns.length}
          tableId={tableId}
        />
      </table>
    </div>
  );
}
