
import { ReloadIcon } from "@radix-ui/react-icons"
import { ColumnDef, getCoreRowModel, useReactTable, VisibilityState } from "@tanstack/react-table"
import { isEmpty, isUndefined } from "lodash"
import Button from "modules/Common/Button"
import TableCell from "modules/Common/Table/components/TableCell"
import TableHeader from "modules/Common/Table/components/TableHeader"
import { ReactNode, useCallback, useState } from "react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "shadcn/ui/dropdown-menu"

type DataTableProps<T> = {
    data: T[]
    columns: ColumnDef<T, any>[]
    columnVisibility?: VisibilityState
    noData?: ReactNode
    actions?: ReactNode
    refetch?: () => void
}

function Table<T>(props: DataTableProps<T>) {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(isUndefined(props.columnVisibility) ? {} : props.columnVisibility)

    const table = useReactTable<T>(
        {
            data: props.data,
            columnResizeMode: "onChange",
            columns: props.columns,
            getCoreRowModel: getCoreRowModel(),
            onColumnVisibilityChange: setColumnVisibility,
            state: { columnVisibility }
        }
    )

    const data = table.getRowModel().rows

    const { refetch } = props
    const handleRefetch = useCallback(() => {
        if (isUndefined(refetch)) {
            return
        }
        refetch()
    }, [refetch])

    return (
        <div className="space-y-5">
            <div className="flex items-center">

                {
                    props.actions ? props.actions : null
                }

                <div className="ml-auto flex space-x-5">

                    {
                        isUndefined(refetch) ? null : (
                            <Button
                                type="button"
                                onClick={handleRefetch}
                                className="space-x-1"
                            >
                                <ReloadIcon />
                                <span className="font-normal">
                                    Làm mới
                                </span>
                            </Button>
                        )
                    }

                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className="ml-auto cursor-pointer outline-none flex space-x-1 items-center border-2 px-2 py-1 rounded"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                            </svg>
                            <span className="text-sm">Cột</span>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Cột hiện thị</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                table.getAllColumns().filter(
                                    (column) => column.getCanHide()
                                ).map(
                                    ({ id, columnDef: { header }, getIsVisible, toggleVisibility }) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={id}
                                                className="capitalize"
                                                checked={getIsVisible()}
                                                onCheckedChange={(value) => toggleVisibility(!!value)}
                                            >
                                                {(isUndefined(header) || isEmpty(header)) ? id : header.toString()}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    }
                                )
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="overflow-x-auto scrollbar-xs">
                <table
                    className="min-w-full border"
                >
                    <thead
                        className="bg-main-primary/10 py-4"
                    >
                        {
                            table.getHeaderGroups().map(
                                headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {
                                            headerGroup.headers.map(
                                                header => (
                                                    <TableHeader<T>
                                                        key={header.id}
                                                        header={header}
                                                    />
                                                )
                                            )
                                        }
                                    </tr>
                                )
                            )
                        }
                    </thead>
                    <tbody>
                        {
                            data.length ? data.map(
                                row => (
                                    <tr
                                        key={row.id}
                                        className="border-b last:border-b-0 hover:bg-slate-200 transition-all duration-300"
                                    >
                                        {
                                            row.getVisibleCells().map(
                                                cell => (
                                                    <TableCell<T>
                                                        key={cell.id}
                                                        cell={cell}
                                                    />
                                                )
                                            )
                                        }
                                    </tr>
                                )
                            ) : (
                                <tr>
                                    <td
                                        className="text-center opacity-50 py-1"
                                        colSpan={table.getAllColumns().filter(({ getIsVisible }) => getIsVisible()).length}
                                    >
                                        {props.noData ? props.noData : "Chưa có dữ liệu!"}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table