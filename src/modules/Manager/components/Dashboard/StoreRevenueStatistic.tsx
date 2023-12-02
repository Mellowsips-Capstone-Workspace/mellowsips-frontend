
import { isEmpty, isNull } from "lodash";
import Loading from "modules/Common/Loading";
import WidgetCard from "modules/Common/WidgetCard";
import { FC, useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import DashboardService from "services/DashboardService";

const colors = [
    "#3872fa",
    "#1cda18",
    "#341242",
    "#7b8804",
    "#866e8d",
    "#7e3084",
    "#b22107",
    "#387482",
    "#a9a779",
    "#e32a1d"
]
const RADIAN = Math.PI / 180
const getColor = (index: number) => {
    if (index >= colors.length) {
        return colors[Math.floor(Math.random() * 10)]
    }
    return colors[index]
}
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

type StoreRevenueStatisticProps = {
    className?: string
    range: { startDate: string | null, endDate: string | null }
}

const StoreRevenueStatistic: FC<StoreRevenueStatisticProps> = ({ className, range }) => {

    const [loading, setLoading] = useState(true)

    const [data, setData] = useState<{ name: string, value: number, color: string }[]>()


    useEffect(() => {
        (
            async () => {
                setLoading(true)

                const { body, status } = await DashboardService.getBusinessStatistics(range)

                if (status === 200 && !isEmpty(body) && body.statusCode === 200 && Array.isArray(body.data.amountForStores)) {
                    const { amountForStores } = body.data

                    const data = amountForStores.map(
                        (store, index) => (
                            {
                                name: store.name,
                                value: store.amount,
                                color: getColor(index)
                            }
                        )
                    )

                    setData(data)

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
                    <h2 className="font-medium text-main-primary text-lg">Biểu đồ doanh thu các cửa hàng</h2>

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
                ) : data ? (
                    <div className="space-y-5">
                        <div className='h-64'>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart
                                    className="[&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white"
                                >
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        strokeWidth={2}
                                        dataKey="value"
                                    >
                                        {
                                            data.map(
                                                (item, index) => (
                                                    <Cell key={index} fill={item.color} stroke={item.color} />
                                                )
                                            )
                                        }
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="">
                            {
                                data.map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 last:mb-0 last:border-0 last:pb-0"
                                        >
                                            <div className="flex items-center justify-start">
                                                <span
                                                    className="me-2 h-2 w-2 rounded-full"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                                <h5 className=" text-sm font-medium">
                                                    {item.name}
                                                </h5>
                                            </div>
                                            <span>{item.value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                                        </div>
                                    )
                                )
                            }
                            <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 last:mb-0 last:border-0 last:pb-0">
                                <div className="flex items-center justify-start">
                                    <span
                                        className="me-2 h-2 w-2 rounded-full"
                                        style={{ backgroundColor: 'red' }}
                                    />
                                    <h5 className=" text-sm font-medium">
                                        Tổng doanh thu:
                                    </h5>
                                </div>
                                <span>

                                    {data.reduce((accumulator, current) => accumulator + current.value, 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}

                                </span>
                            </div>
                        </div>

                    </div>
                ) : null
            }

            <p className="text-gray-500 text-sm text-center italic">
                <span>Thống kê từ ngày </span>
                <span className="font-medium">{range.startDate!.split("-").reverse().join("-")}</span>
                <span> đến </span>
                <span className="font-medium">{isNull(range.endDate) ? "hôm nay" : range.endDate.split("-").reverse().join("-")}.</span>
            </p>
        </WidgetCard>
    )
}

export default StoreRevenueStatistic