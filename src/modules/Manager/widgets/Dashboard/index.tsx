import { format, parseISO } from "date-fns";
import { isNull, isUndefined } from "lodash";
import DateRangeSelect from "modules/Common/DateRangeSelect";
import { Widget } from "modules/Layout/Dashboard";
import OrderStatusStatistic from "modules/Manager/components/Dashboard/OrderStatusStatistic";
import StoreRevenueStatistic from "modules/Manager/components/Dashboard/StoreRevenueStatistic";
import TopProduct from "modules/Manager/components/Dashboard/TopProducts";
import VoucherSummary from "modules/Manager/components/Dashboard/VoucherSummary";
import { useCallback, useState } from "react";
import { DateRange } from "react-day-picker";
import { subtractDate } from "utils/date";

const Dashboard = () => {
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

    return (
        <Widget className="space-y-5">

            <div className="col-span-2 bg-white rounded shadow p-5 h-fit">
                <div className="flex justify-between items-center">
                    <h2 className="font-medium text-main-primary text-lg">Tổng quan</h2>
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

            </div>
            {/* <StatCards className="col-span-2" /> */}
            <div className="grid grid-cols-2 gap-5">
                <OrderStatusStatistic
                    range={range}
                    className="h-fit"
                />
                <TopProduct
                    range={range}
                />
                <StoreRevenueStatistic
                    className="h-fit"
                    range={range}
                />
                <VoucherSummary range={range} />
            </div>
        </Widget>
    )
}

export default Dashboard