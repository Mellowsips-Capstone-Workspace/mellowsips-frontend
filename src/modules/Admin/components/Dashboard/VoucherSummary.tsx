import { format, parseISO } from 'date-fns';
import { isEmpty, isNull, isUndefined } from 'lodash';
import DateRangeSelect from 'modules/Common/DateRangeSelect';
import Loading from 'modules/Common/Loading';
import WidgetCard from 'modules/Common/WidgetCard';
import { FC, useCallback, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import DashboardService from 'services/DashboardService';
import { subtractDate } from 'utils/date';

const COLORS = ['#BFDBFE', '#0070F3'];

type VoucherSummaryProps = {
    className?: string
}

const VoucherSummary: FC<VoucherSummaryProps> = ({ className }) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<{ name: string, value: number }[]>([])

    const [range, setRange] = useState<{ startDate: string | null, endDate: string | null }>(
        {
            startDate: format(subtractDate(new Date(), 7), "yyyy-MM-dd"),
            endDate: format(new Date(), "yyyy-MM-dd")
        }
    )

    const handleSetRange = useCallback(({ from, to }: DateRange) => {
        const range = {
            startDate: isUndefined(from) ? null : format(from, "yyyy-MM-dd"),
            endDate: isUndefined(to) ? null : format(to, "yyyy-MM-dd")
        }
        setRange(range)
    }, [])

    useEffect(() => {
        (
            async () => {
                setLoading(true)

                const { body, status } = await DashboardService.getAdminDashboard(range)

                if (status === 200 && !isEmpty(body) && body.statusCode === 200) {
                    const { pendingVoucherAmount, usedVoucherAmount } = body.data

                    setData(
                        [
                            { name: "Đang xử lý", value: pendingVoucherAmount },
                            { name: "Đã sử dụng", value: usedVoucherAmount },
                        ]
                    )

                } else {
                    setData([])
                }

                setLoading(false)
            }
        )()
    }, [range])

    return (

        <WidgetCard
            title={
                (
                    <div className="flex justify-between items-center">
                        <h2 className="font-medium text-main-primary text-lg">Tổng quan về mã giảm giá</h2>
                        <div className="flex space-x-4 border rounded px-2 py-0.5">
                            <div className="flex space-x-1 text-gray-500">
                                <span className="font-medium">{range.startDate!.split("-").reverse().join("/")}</span>
                                <span>-</span>
                                <span className="font-medium">{isNull(range.endDate) ? "hôm nay" : range.endDate.split("-").reverse().join("/")}</span>
                            </div>
                            <DateRangeSelect
                                initial={
                                    {
                                        from: isNull(range.startDate) ? undefined : parseISO(range.startDate),
                                        to: isNull(range.endDate) ? undefined : parseISO(range.endDate)
                                    }
                                }
                                onSelect={handleSetRange}
                            />
                        </div>
                    </div>
                )
            }
            className={className}
        >
            {
                loading ? (
                    <div className="h-64 mx-auto w-fit flex justify-center items-center space-x-1 p-2 text-xs">
                        <Loading.Circle className="text-main-primary" size={14} />
                        <span className="text-gray-400">Đang tải dữ liệu</span>
                    </div>
                ) : data.length ? (
                    <div className='py-5 space-y-5'>
                        <div className="space-y-2">
                            {
                                data.map(
                                    (item, index) => (
                                        <div
                                            key={item.name}
                                            className="flex items-center justify-between border-b border-gray-200 pb-4 last:mb-0 last:border-0 last:pb-0"
                                        >
                                            <div className="flex items-center justify-start">
                                                <span
                                                    className="me-2 h-2 w-2 rounded-full"
                                                    style={{ backgroundColor: COLORS[index] }}
                                                />
                                                <span
                                                    className="font-lexend text-lg font-medium text-gray-900 dark:text-gray-700"
                                                >
                                                    {item.name}
                                                </span>
                                            </div>
                                            <span className='text-lg font-medium'>{item.value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        <p className="text-gray-500 text-sm text-center italic">
                            <span>Thống kê từ ngày </span>
                            <span className="font-medium">{range.startDate!.split("-").reverse().join("-")}</span>
                            <span> đến </span>
                            <span className="font-medium">{isNull(range.endDate) ? "hôm nay" : range.endDate.split("-").reverse().join("-")}.</span>
                        </p>
                    </div>
                ) : null
            }
        </WidgetCard>
    )
}

export default VoucherSummary