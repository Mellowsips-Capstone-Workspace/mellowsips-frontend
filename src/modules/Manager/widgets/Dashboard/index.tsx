import { format, parseISO } from "date-fns";
import ROLE from "enums/role";
import { isNull, isUndefined } from "lodash";
import DateRangeSelect from "modules/Common/DateRangeSelect";
import SelectStoreManage from "modules/Common/SelectStoreManage";
import useSelectStore from "modules/Common/SelectStoreManage/hooks/useSelectStore";
import { Widget } from "modules/Layout/Dashboard";
import OrderStatusStatistic from "modules/Manager/components/Dashboard/OrderStatusStatistic";
import StoreRevenueStatistic from "modules/Manager/components/Dashboard/StoreRevenueStatistic";
import TopProduct from "modules/Manager/components/Dashboard/TopProducts";
import VoucherSummary from "modules/Manager/components/Dashboard/VoucherSummary";
import { useCallback, useState } from "react";
import { DateRange } from "react-day-picker";
import { useAppSelector } from "stores/root";
import { Principle } from "types/authenticate";
import { subtractDate } from "utils/date";

const Dashboard = () => {
    const { type, storeId: accountStoreId } = useAppSelector<Principle>(state => state.authenticate.principle!)
    const { loading: storeLoading, stores, storeId, setStoreId } = useSelectStore(null, false)
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
                    <div className="flex space-x-5">
                        {
                            type === ROLE.OWNER ? (
                                <div className="w-80">
                                    <SelectStoreManage
                                        stores={stores}
                                        loading={storeLoading}
                                        storeId={storeId}
                                        showSelectAll={true}
                                        setStoreId={setStoreId}
                                    />
                                </div>
                            ) : null
                        }

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

            </div>
            {
                storeLoading ? null : (
                    <div className="grid grid-cols-2 gap-5">
                        <OrderStatusStatistic
                            range={range}
                            className="h-fit"
                            storeId={type === ROLE.OWNER ? storeId : accountStoreId}
                        />
                        <TopProduct
                            range={range}
                            storeId={type === ROLE.OWNER ? storeId : accountStoreId}
                        />
                        {
                            type === ROLE.OWNER ? (
                                <StoreRevenueStatistic
                                    className="h-fit"
                                    range={range}
                                />
                            ) : null
                        }
                        {
                            type === ROLE.OWNER ? (
                                <VoucherSummary
                                    range={range}
                                />
                            ) : null
                        }
                    </div>
                )
            }
        </Widget>
    )
}

export default Dashboard