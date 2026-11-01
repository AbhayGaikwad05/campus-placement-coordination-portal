import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Download, ArrowUpDown } from 'lucide-react';
import { mockService } from '../../services/mockService';

export function DataTable({
  data = [],
  columns = [],
  searchPlaceholder = 'Search records...',
  searchFilterKey,
  exportFilename,
  emptyMessage = 'No records found matching criteria',
  pageSize = 10,
  actions
}) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  // Filter
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const query = search.toLowerCase();
    return data.filter(item => {
      if (searchFilterKey) {
        return searchFilterKey(item).toLowerCase().includes(query);
      }
      return Object.values(item).some(val =>
        String(val ?? '').toLowerCase().includes(query)
      );
    });
  }, [data, search, searchFilterKey]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA === valB) return 0;
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;
      if (valA < valB) return sortAsc ? -1 : 1;
      return sortAsc ? 1 : -1;
    });
  }, [filteredData, sortKey, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleExport = () => {
    if (!exportFilename) return;
    const headers = columns.map(c => c.header);
    const rows = sortedData.map(item =>
      columns.map(c => String(item[c.key] ?? ''))
    );
    mockService.exportToCsv(exportFilename, headers, rows);
  };

  return (
    <div className="bg-white border border-[#E0E6ED] rounded-xl overflow-hidden shadow-xs">
      {/* Control Bar */}
      <div className="p-3.5 border-b border-[#E0E6ED] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F8FAFC]">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full text-xs pl-9 pr-3.5 py-2 bg-white border border-[#E0E6ED] rounded-lg text-[#172B45] placeholder-slate-400 focus:outline-none focus:border-[#3478C5] focus:ring-2 focus:ring-[#3478C5]/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {actions}
          {exportFilename && (
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0E6ED] bg-white text-[#172B45] hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#172B45]">
          <thead className="bg-[#F8FAFC] text-[#64748B] font-bold border-b border-[#E0E6ED] uppercase tracking-wider text-[11px]">
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-3.5 ${col.className || ''}`}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-1.5 hover:text-[#17365D] transition-colors font-bold cursor-pointer"
                    >
                      <span>{col.header}</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E0E6ED]/60">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-slate-400"
                >
                  <p className="text-sm font-medium">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  {columns.map(col => (
                    <td key={col.key} className={`px-4 py-3.5 ${col.className || ''}`}>
                      {col.render ? col.render(item) : String(item[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-[#E0E6ED] flex items-center justify-between text-xs text-[#64748B] bg-[#F8FAFC]">
        <div>
          Showing <span className="font-bold text-[#172B45]">{sortedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{' '}
          <span className="font-bold text-[#172B45]">
            {Math.min(currentPage * pageSize, sortedData.length)}
          </span>{' '}
          of <span className="font-bold text-[#172B45]">{sortedData.length}</span> records
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="p-1.5 rounded-lg border border-[#E0E6ED] bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2.5 text-xs font-bold text-[#172B45]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="p-1.5 rounded-lg border border-[#E0E6ED] bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
