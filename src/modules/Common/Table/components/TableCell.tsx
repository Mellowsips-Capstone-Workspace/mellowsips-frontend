import { Cell, flexRender } from "@tanstack/react-table"

type TableCellProps<T> = {
    cell: Cell<T, unknown>
}

function TableCell<T>(props: TableCellProps<T>) {
    const { cell } = props
    const { id, column, getContext } = cell
    return (
        <td
            key={id}
            data-key={id}
            className="overflow-hidden text-center truncate max-w-0 px-2 py-1"
        >
            {
                flexRender(column.columnDef.cell, getContext())
            }
        </td>
    )
}

export default TableCell