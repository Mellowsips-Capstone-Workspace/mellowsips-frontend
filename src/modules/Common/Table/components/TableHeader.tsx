import { Header, flexRender } from "@tanstack/react-table"

type TableHeaderProps<T> = {
    header: Header<T, unknown>
}

function TableHeader<T>(props: TableHeaderProps<T>) {
    const { header } = props
    const { isPlaceholder, id, getSize, column, getContext, getResizeHandler } = header

    return (
        <th
            key={id}
            data-label={id}
            className="overflow-hidden truncate max-w-0 py-2 border relative hover:bg-main-primary hover:text-white transition-colors duration-300 group"
            style={{ minWidth: getSize() }}
        >
            {
                isPlaceholder ? null : flexRender(column.columnDef.header, getContext())
            }
            <div
                aria-checked={column.getIsResizing()}
                className="absolute top-0 right-0 w-1 cursor-col-resize aria-checked:bg-slate-500 group-hover:bg-slate-500 h-full"
                onMouseDown={getResizeHandler()}
                onTouchStart={getResizeHandler()}
            />
        </th>
    )
}

export default TableHeader