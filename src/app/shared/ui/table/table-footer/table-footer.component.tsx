import React, { FC, useEffect } from "react";
import { TableFooterProperties } from "../table.model";
import styles from "./table-footer.styles.module.css";

export const TableFooter: FC<TableFooterProperties> = ({
  range,
  setPage,
  page,
  slice,
  columnsCount,
  tableId,
}) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <tfoot>
      <tr>
        <td colSpan={columnsCount}>
          <div className={styles["footer-container"]}>
            {range.map((pageNumber) => (
              <button
                key={`${tableId}-page-number-${pageNumber}`}
                onClick={() => setPage(pageNumber)}
                className={` ${
                  page === pageNumber
                    ? styles.activeButton
                    : styles.inactiveButton
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </td>
      </tr>
    </tfoot>
  );
};
