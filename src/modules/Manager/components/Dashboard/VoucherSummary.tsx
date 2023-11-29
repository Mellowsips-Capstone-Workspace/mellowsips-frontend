import { format, parseISO } from 'date-fns';
import { isEmpty, isNull, isUndefined } from 'lodash';
import DateRangeSelect from 'modules/Common/DateRangeSelect';
import TagIcon from 'modules/Common/Icons/tag';
import TicketIcon from 'modules/Common/Icons/ticket';
import Loading from 'modules/Common/Loading';
import WidgetCard from 'modules/Common/WidgetCard';
import { FC, useCallback, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';
import DashboardService from 'services/DashboardService';
import VoucherService from 'services/VoucherService';
import { subtractDate } from 'utils/date';


const COLORS = ['#BFDBFE', '#0070F3'];

function CustomLabel(props: any) {
    const { cx, cy } = props.viewBox;
    return (
        <>
            <text
                x={cx}
                y={cy - 5}
                fill="#111111"
                className="recharts-text recharts-label"
                textAnchor="middle"
                dominantBaseline="central"
            >
                <tspan fill="#111111" alignmentBaseline="middle" fontSize="36px">
                    {props.value1}
                </tspan>
            </text>
            <text
                x={cx}
                y={cy + 20}
                fill="#666666"
                className="recharts-text recharts-label"
                textAnchor="middle"
                dominantBaseline="central"
            >
                <tspan fill="#666666" fontSize="14px">{props.value2}</tspan>
            </text>
        </>
    );
}

type VoucherSummaryProps = {
    className?: string
}
const VoucherSummary: FC<VoucherSummaryProps> = ({ className }) => {
    const [loading, setLoading] = useState(true)
    const [range, setRange] = useState<{ startDate: string | null, endDate: string | null }>(
        {
            startDate: format(subtractDate(new Date(), 7), "yyyy-MM-dd"),
            endDate: format(new Date(), "yyyy-MM-dd")
        }
    )

    const [data, setData] = useState<{ name: string, value: number }[]>([])
    const [quantity, setQuantity] = useState({ cash: 0, percent: 0 })


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

                const { body, status } = await DashboardService.getBusinessStatistics(range)



                if (status === 200 && !isEmpty(body) && body.statusCode === 200 && Array.isArray(body.data.amountForStores)) {
                    const { pendingVoucherAmount, usedVoucherAmount } = body.data

                    setData(
                        [
                            { name: "Đang được sử dụng", value: pendingVoucherAmount },
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

    useEffect(() => {
        (
            async () => {

                const { body, status } = await VoucherService.search({ pagination: { page: 1, offset: 10000 } })



                if (status === 200 && !isEmpty(body) && body.statusCode === 200 && Array.isArray(body.data.results)) {
                    const { results } = body.data

                    setQuantity(
                        {
                            cash: results.filter(({ discountType }) => discountType === "CASH").length,
                            percent: results.filter(({ discountType }) => discountType === "PERCENT").length
                        }
                    )

                } else {
                    setQuantity(
                        {
                            cash: 0,
                            percent: 0
                        }
                    )
                }

            }
        )()
    }, [range])

    return (
        <div>

            <WidgetCard
                title={
                    (
                        <div className="flex justify-between">
                            <h2 className="font-medium text-main-primary text-lg">Tổng quan doanh thu đơn hàng</h2>
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
                            <div className='mx-auto h-64 aspect-square'>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart className="[&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
                                        <Pie
                                            data={data}
                                            cornerRadius={40}
                                            innerRadius={100}
                                            outerRadius={120}
                                            paddingAngle={10}
                                            fill="#BFDBFE"
                                            stroke="rgba(0,0,0,0)"
                                            dataKey="value"
                                        >
                                            <Label
                                                width={30}
                                                position="center"
                                                content={
                                                    <CustomLabel
                                                        value1={data[0].value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                                        value2={(data[0].value + data[1].value).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                                    />
                                                }
                                            ></Label>
                                            {
                                                data.map(
                                                    (_, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={COLORS[index % COLORS.length]}
                                                        />
                                                    )
                                                )
                                            }
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
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
                                                        className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700"
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>
                                                <span>{item.value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                            <hr />
                            <div className="grid grid-cols-2 gap-x-5">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-12 w-12 items-center justify-center">
                                        <TicketIcon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold text-gray-900">${quantity.percent} mã</p>
                                        <p>Giảm theo phần trăm</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-12 w-12 items-center justify-center">
                                        <TagIcon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold text-gray-900">{quantity.percent} mã</p>
                                        <p>Giảm theo giá trị</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    ) : null
                }


            </WidgetCard>
        </div>
    );
}

export default VoucherSummary