import { useState } from "react";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import LinearLoader from "./ui/LinearLoader";
import Pagination from "./ui/Pagination";

const Table = ({
  columns,
  rows,
  onRowClick,
  topContent,
  cellRenderer,
  handlePagination,
  pagination = {
    page: 1,
    pageSize: 10,
    rowsNumber: rows.length,
    sortKey: null,
    isDesc: false,
    loading: false
  }
}) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const totalPages = Math.ceil(pagination.rowsNumber / pagination.pageSize);

  const handleSort = (field) => {
    if (field === "actions") return
    let newDir = "asc";
    if (sortKey === field) {
      newDir = sortDir === "asc" ? "desc" : "asc";
    }
    setSortKey(field);
    setSortDir(newDir);
    handlePagination({ ...pagination, sortKey: field, isDesc: newDir === "desc" });
  };

  const handlePageChange = (newPage) => {
    handlePagination({ ...pagination, page: newPage })
  };

  return (

    <div className="w-full  bg-white rounded-lg shadow-md">
      {topContent && (
        <div className="px-2 py-2">
          {topContent}
        </div>
      )}

      {pagination.loading && <LinearLoader />}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 rounded-lg">
          <thead className="bg-gray-50 text-gray-700 text-sm">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.field}
                  className="px-4 font-semibold py-3 text-center cursor-pointer select-none"
                  onClick={() => handleSort(col.field)}
                >
                  <div className={"flex items-center gap-1" + (col.field === "actions" ? " justify-end" : "")} >
                    {col.label}
                    {sortKey === col.field && (
                      sortDir === "asc" ?
                        <KeyboardArrowUpOutlinedIcon fontSize="small" /> :
                        <KeyboardArrowDownOutlinedIcon fontSize="small" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-xs divide-y divide-gray-100">
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className="hover:bg-gray-50 transition cursor-pointer"
              >
                {columns.map((col, cIdx) => (
                  <td
                    key={cIdx}
                    className={`px-4 py-3 whitespace-normal ${col.field === 'description' ? 'max-w-[300px]' : col.field === 'actions' ? 'flex justify-end' : ''}`}
                  >
                    {cellRenderer ? cellRenderer(row, col, rowIndex, cIdx) : row[col.field]}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center px-4 py-6 text-gray-500">
                  No matching data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        pagination={pagination}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default Table;
