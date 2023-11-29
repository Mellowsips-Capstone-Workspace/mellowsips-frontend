import { format, parseISO } from 'date-fns';
import { isArray, isEmpty, isNull, isUndefined } from 'lodash';
import { CustomTooltip } from 'modules/Common/Chart/CustomTooltip';
import DateRangeSelect from 'modules/Common/DateRangeSelect';
import Loading from 'modules/Common/Loading';
import showToast from 'modules/Common/Toast';
import WidgetCard from 'modules/Common/WidgetCard';
import { FC, useCallback, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import OrderService from 'services/OrderService';
import { OrderStatus } from 'types/order';
import { subtractDate } from 'utils/date';


type OrderRateProps = {
    className?: string
}

type OrderData = {
    status: string
    storeId: string
    date: Date
}

type RootData = {
    [key: string]: OrderData[]
}

type DataVisualize = {
    label: string
    done: number
    cancel: number
    reject: number
    fake: number
    total: number
}

const colorSchema = {
    total: "#0813ea",
    done: "#297a18",
    cancel: "#A9A9A9",
    reject: "#FFA500",
    fake: "#FF0000"
}

const OrderRate: FC<OrderRateProps> = ({ className }) => {
    const [data, setData] = useState<RootData>()
    const [dataSet, setDataSet] = useState<DataVisualize[]>([])
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(true)
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
                const { body, status } = await OrderService.search(
                    {
                        pagination: {
                            page: 1,
                            offset: 10000
                        },
                        status: [
                            OrderStatus.CANCELED,
                            OrderStatus.RECEIVED,
                            OrderStatus.COMPLETED,
                            OrderStatus.REJECTED,
                            OrderStatus.DECLINED
                        ],
                        order: "ASC"
                    }
                )

                if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
                    showToast(
                        {
                            type: "warning",
                            title: "Chú ý",
                            message: "Hiện tại chưa thể tải dữ liệu về các order."
                        }
                    )
                } else {
                    const data = body.data.results.map(
                        ({ status, updatedAt, details: { store: { id: storeId } } }) => {
                            const date = new Date(updatedAt)

                            return {
                                status,
                                storeId,
                                date
                            }
                        }
                    ).reduce((accumulator, current) => {
                        const { date } = current
                        const key = `${date.getFullYear()}_${(date.getMonth() + 1).toString().padStart(2, "0")}_${date.getDate().toString().padStart(2, "0")}`

                        if (isArray(accumulator[key])) {
                            accumulator[key].push(current)
                        } else {
                            accumulator[key] = []
                        }
                        return accumulator
                    }, {})
                    setData(data)
                }
                setLoading(false)
            }
        )()
    }, [])

    useEffect(() => {
        const { startDate, endDate } = range
        if (loading || isUndefined(data) || isNull(startDate)) {
            return
        }

        setProcessing(true)

        if (isNull(endDate)) {
            console.log(data);
            setProcessing(false)
            return
        }

        const temp: RootData = {}

        Object.keys(data).forEach(
            key => {
                const keyValue = key.replaceAll("_", "-")

                if (keyValue < startDate || keyValue > endDate) {
                    return
                }

                temp[key] = data[key]
            }
        )

        const dataSet = Object.entries(temp).map(
            ([key, values]) => {
                const date = parseISO(key.replaceAll("_", "-"))
                const done = values.filter(({ status }) => status === OrderStatus.RECEIVED || status === OrderStatus.CANCELED).length
                const cancel = values.filter(({ status }) => status === OrderStatus.CANCELED).length
                const reject = values.filter(({ status }) => status === OrderStatus.REJECTED).length
                const fake = values.filter(({ status }) => status === OrderStatus.DECLINED).length
                const total = done + cancel + reject + fake

                return {
                    label: `${date.getDate()}/${date.getMonth() + 1}`,
                    done,
                    cancel,
                    reject,
                    fake,
                    total
                }
            }
        )
        setDataSet(dataSet)
        setProcessing(false)

    }, [data, loading, range])


    return (
        <WidgetCard
            title={
                (
                    <div className="flex justify-between">
                        <h2 className="font-medium text-main-primary text-lg">Tổng quan đơn hàng</h2>
                        <div
                            aria-disabled={loading}
                            className="aria-disabled:opacity-0 aria-disabled:pointer-events-none"
                        >
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
            descriptionClassName="text-xl font-semibold text-gray-900 mt-1.5 2xl:text-2xl"
            className={className}
        >
            {
                loading ? (
                    <div className="h-64 mx-auto w-fit flex justify-center items-center space-x-1 p-2 text-xs">
                        <Loading.Circle className="text-main-primary" size={14} />
                        <span className="text-gray-400">Đang tải dữ liệu.</span>
                    </div>
                ) : processing ? (
                    <div className="h-64 mx-auto w-fit flex justify-center items-center space-x-1 p-2 text-xs">
                        <Loading.Circle className="text-indigo-500" size={14} />
                        <span className="text-gray-400">Dữ liệu đang được xử lý.</span>
                    </div>
                ) : (

                    <div className="h-64 py-5 w-full">
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <AreaChart
                                data={dataSet}
                                margin={
                                    {
                                        left: -24,
                                    }
                                }
                                className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
                            >
                                <defs>
                                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colorSchema.total} stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="done" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colorSchema.done} stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="cancel" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colorSchema.cancel} stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="reject" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colorSchema.reject} stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="fake" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colorSchema.fake} stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                    </linearGradient>

                                </defs>
                                <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
                                <XAxis
                                    dataKey="label"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="done"
                                    name="Hoàn thành"
                                    stroke={colorSchema.done}
                                    strokeWidth={2}
                                    fill="url(#done)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="cancel"
                                    name="Bị huỷ"
                                    stroke={colorSchema.cancel}
                                    strokeWidth={2}
                                    fill="url(#cancel)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="reject"
                                    name="Đã từ chối"
                                    stroke={colorSchema.reject}
                                    strokeWidth={2}
                                    fill="url(#reject)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="fake"
                                    name="Đơn ảo"
                                    stroke={colorSchema.fake}
                                    strokeWidth={2}
                                    fill="url(#fake)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    name="Tổng"
                                    stroke={colorSchema.total}
                                    strokeWidth={2}
                                    fill="url(#total)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )
            }
            <p className="text-gray-500 text-sm text-center italic">
                <span>Thống kê từ ngày </span>
                <span className="font-medium">{range.startDate!.split("-").reverse().join("-")}</span>
                <span> đến </span>
                <span className="font-medium">{isNull(range.endDate) ? "hôm nay" : range.endDate.split("-").reverse().join("-")}.</span>
            </p>
        </WidgetCard>
    );
}


export default OrderRate