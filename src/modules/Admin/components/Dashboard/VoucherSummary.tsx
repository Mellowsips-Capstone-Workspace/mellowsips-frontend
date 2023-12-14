import { isEmpty, isNull } from 'lodash';
import Loading from 'modules/Common/Loading';
import WidgetCard from 'modules/Common/WidgetCard';
import { FC, useEffect, useState } from 'react';
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';
import DashboardService from 'services/DashboardService';

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
    range: { startDate: string | null, endDate: string | null }
}

const VoucherSummary: FC<VoucherSummaryProps> = ({ className, range }) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<{ name: string, value: number }[]>([])

    useEffect(() => {
        (
            async () => {
                setLoading(true)

                const { body, status } = await DashboardService.getAdminDashboard(range)

                if (status === 200 && !isEmpty(body) && body.statusCode === 200) {
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

    // const [quantity, setQuantity] = useState({ cash: 0, percent: 0 })
    // useEffect(() => {
    //     (
    //         async () => {

    //             const { body, status } = await VoucherService.search({ pagination: { page: 1, offset: 10000 } })



    //             if (status === 200 && !isEmpty(body) && body.statusCode === 200 && Array.isArray(body.data.results)) {
    //                 const { results } = body.data

    //                 setQuantity(
    //                     {
    //                         cash: results.filter(({ discountType }) => discountType === "CASH").length,
    //                         percent: results.filter(({ discountType }) => discountType === "PERCENT").length
    //                     }
    //                 )

    //             } else {
    //                 setQuantity(
    //                     {
    //                         cash: 0,
    //                         percent: 0
    //                     }
    //                 )
    //             }

    //         }
    //     )()
    // }, [range])

    return (

        <WidgetCard
            title={
                (
                    <h2 className="font-medium text-main-primary text-lg">Tổng quan về mã giảm giá</h2>

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
                        <p className="text-gray-500 text-sm text-center italic">
                            <span>Thống kê từ ngày </span>
                            <span className="font-medium">{range.startDate!.split("-").reverse().join("-")}</span>
                            <span> đến </span>
                            <span className="font-medium">{isNull(range.endDate) ? "hôm nay" : range.endDate.split("-").reverse().join("-")}.</span>
                        </p>
                        {/* <hr /> */}
                        {/* <div className="grid grid-cols-2 gap-x-5">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-12 w-12 items-center justify-center">
                                    <TicketIcon className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-base font-semibold text-gray-900">{quantity.percent} mã</p>
                                    <p>Giảm theo phần trăm</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-12 w-12 items-center justify-center">
                                    <TagIcon className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-base font-semibold text-gray-900">{quantity.cash} mã</p>
                                    <p>Giảm theo giá trị</p>
                                </div>
                            </div>
                        </div> */}

                    </div>

                ) : null
            }
        </WidgetCard>
    )
}

export default VoucherSummary