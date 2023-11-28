import Loading from "modules/Common/Loading"
import { nanoid } from "nanoid"
import { FC } from "react"

type TableSkeletonProps = {
    column: number
}

const TableSkeleton: FC<TableSkeletonProps> = ({ column = 5 }) => {
    return (
        <div className="animate-pulse w-full bg-inherit">
            <div className="border rounded">
                {
                    Array(column).fill(0).map(
                        () => (
                            <div
                                key={nanoid()}
                                className="grid grid-cols-5 gap-5 last:border-b-0 border-b px-5 py-1"
                            >
                                <div className="h-5 py-2 w-full">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                                <div className="h-5 py-2 w-full">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                                <div className="h-5 py-2 w-full">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                                <div className="h-5 py-2 w-full">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                                <div className="h-5 py-2 w-full">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

const WidgetSkeleton: FC = () => {
    return (
        <div className="space-y-5 animate-pulse">
            <div className=" bg-white rounded px-5 py-2 space-y-2 shadow">
                <div className="space-y-2">
                    <div className="flex h-7 items-center">
                        <div className="h-5 w-1/4 bg-slate-200 rounded"></div>
                    </div>
                    <div className="flex h-7 items-center">
                        <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
            <div className="h-60 bg-white rounded shadow grid place-content-center">
                <div className="w-max space-y-1">
                    <div className="w-fit mx-auto opacity-80">
                        <Loading.Circle className="text-main-primary" />
                    </div>
                    <p className="w-fit text-center text-opacity-80 italic text-sm">Đang tải dữ liệu</p>
                </div>
            </div>
        </div>
    )
}

export {
    TableSkeleton,
    WidgetSkeleton
}

