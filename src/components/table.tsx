import React, { useState } from "react";
import Dropdown from "./dropdown";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ColumnType<T> = {
  title: React.ReactNode | (() => React.ReactNode);
  dataIndex: keyof T | string;
  width?: number | string;
  isHidden?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  className?: string;
};

interface TableProps<T extends object> {
  columns: ColumnType<T>[];
  data: T[];
}

function Table<T extends object>({ columns, data }: TableProps<T>) {
  // Filter out hidden columns
  const visibleColumns = columns.filter((col) => !col.isHidden);
  const [page, setPage] = useState(10);

  return (
    <div className="overflow-x-auto shadow-md ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {visibleColumns.map((col, idx) => (
              <th
                key={idx}
                className={`px-6 py-3 ${col.className || ""}`}
                style={col.width ? { width: col.width } : undefined}
              >
                {typeof col.title === "function" ? col.title() : col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, rowIdx) => (
            <tr
              key={rowIdx}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {visibleColumns.map((col, colIdx) => (
                <td key={colIdx} className="px-6 py-4 truncate max-w-xs">
                  {col.render
                    ? col.render(
                        col.dataIndex in record
                          ? (record as any)[col.dataIndex]
                          : undefined,
                        record,
                        rowIdx
                      )
                    : (record as any)[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={visibleColumns.length}>
              <div className="flex items-center justify-end p-4 w-full">
                <span className="me-2 text-sm font-medium text-gray-900 dark:text-white">
                  Rows per page:
                </span>
                <Dropdown
                  title=""
                  options={["10", "20", "50", "100"]}
                  value={String(page)}
                  onChange={(value) => setPage(Number(value))}
                  width={80}
                />
                <span className="ms-4 text-sm font-medium text-gray-900 dark:text-white">
                  {`1-${page} of ${data.length}`}
                </span>
                <ChevronLeft className="w-4 h-4 ms-2 inline" />
                <ChevronRight className="w-4 h-4 ms-2 inline" />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
