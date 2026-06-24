import React from 'react';

// ------------------------------------------------------------------
// Tipos genéricos
// ------------------------------------------------------------------

export interface Column<T> {
  /** Clave única, también usada para acceder a la propiedad directa del objeto */
  key: string;
  /** Texto que se muestra en la cabecera */
  header: string;
  /** Si true, la columna se oculta en pantallas menores a md */
  hideOnMobile?: boolean;
  /** Permite personalizar el contenido de la celda */
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  /** Array de objetos a mostrar */
  data: T[];
  /** Definición de columnas */
  columns: Column<T>[];
  /** Página actual (1-indexada) */
  currentPage: number;
  /** Total de páginas */
  totalPages: number;
  /** Callback para cambiar de página */
  onPageChange: (page: number) => void;
  /** Cantidad de filas por página (default 5) */
  itemsPerPage?: number;
  /** Mensaje cuando no hay datos */
  emptyMessage?: string;
}

// ------------------------------------------------------------------
// Componente
// ------------------------------------------------------------------

function DataTable<T extends { id: string }>({
  data,
  columns,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 5,
  emptyMessage = 'No se encontraron resultados.',
}: DataTableProps<T>) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="bg-bg-primary border border-border-light rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-bg-tertiary border-b border-border-light">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-label-large text-text-secondary font-medium uppercase tracking-wider ${
                    col.hideOnMobile ? 'hidden md:table-cell' : ''
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border-light">
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-bg-tertiary/50 transition-colors"
                >
                  {columns.map((col) => {
                    const cellContent = col.render
                      ? col.render(item)
                      : String((item as Record<string, unknown>)[col.key] ?? '—');

                    return (
                      <td
                        key={col.key}
                        className={`px-6 py-4 text-body-small text-text-secondary ${
                          col.hideOnMobile ? 'hidden md:table-cell' : ''
                        }`}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-body-medium text-text-secondary"
                >
                  <i className="fas fa-search text-3xl text-text-tertiary block mb-2" />
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data.length > 0 && (
        <div className="px-6 py-4 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4 text-label-small text-text-secondary">
          <span>
            Mostrando {startIndex + 1} a{' '}
            {Math.min(endIndex, data.length)} de {data.length} resultados
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-border-light hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            <span className="px-3 py-1.5">
              Página {currentPage} de {totalPages || 1}
            </span>
            <button
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 rounded-lg border border-border-light hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;