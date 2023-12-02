
import { isEmpty, isNull } from "lodash";
import CircleProgressBar from "modules/Common/Chart/CircleProgressbar";
import Loading from "modules/Common/Loading";
import WidgetCard from "modules/Common/WidgetCard";
import { FC, useEffect, useState } from "react";
import DashboardService from "services/DashboardService";
import { calculatePercentage } from "utils/number";

type OrderStatusStatisticProps = {
    className?: string
    range: { startDate: string | null, endDate: string | null }
}

const OrderStatusStatistic: FC<OrderStatusStatisticProps> = ({ className, range }) => {


    const [data, setData] = useState(
        [
            {
                name: "Chưa hoàn thành",
                value: "0",
                percentage: 0,
                color: "#3872FA",
            },
            {
                name: "Đã hoàn thành",
                value: "0",
                percentage: 0,
                color: "#10b981",
            },
            {
                name: "Bị bom",
                value: "0",
                percentage: 0,
                color: "#f1416c",
            }
        ]
    )

    const [loading, setLoading] = useState(true)



    useEffect(() => {
        (
            async () => {
                setLoading(true)

                const { body, status } = await DashboardService.getBusinessStatistics(range)

                if (status === 200 && !isEmpty(body) && body.statusCode === 200) {
                    const { flakedOrderAmount, successOrderAmount, pendingOrderAmount } = body.data

                    const total = flakedOrderAmount + successOrderAmount + pendingOrderAmount

                    setData(
                        [
                            {
                                name: "Chưa hoàn thành",
                                value: pendingOrderAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
                                percentage: calculatePercentage(pendingOrderAmount, total),
                                color: "#3872FA",
                            },
                            {
                                name: "Đã hoàn thành",
                                value: successOrderAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
                                percentage: calculatePercentage(successOrderAmount, total),
                                color: "#10b981",
                            },
                            {
                                name: "Bị boom",
                                value: flakedOrderAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
                                percentage: calculatePercentage(flakedOrderAmount, total),
                                color: "#f1416c",
                            }
                        ]
                    )

                }

                setLoading(false)

            }
        )()
    }, [range])

    return (
        <WidgetCard
            title={
                (
                    <h2 className="font-medium text-main-primary text-lg">Tổng quan doanh thu đơn hàng</h2>
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
                ) : (
                    <div className="h-64 grid grid-cols-3 gap-8 py-5">

                        {
                            data.map(
                                (item) => (
                                    <div
                                        key={item.name}
                                        className="space-y-5"
                                    >
                                        <div className="group cursor-pointer">
                                            <CircleProgressBar
                                                percentage={item.percentage}
                                                size={120}
                                                stroke="#f0f0f0"
                                                strokeWidth={8}
                                                progressColor={item.color}
                                                useParentResponsive={true}
                                                label={
                                                    <div>
                                                        <p className="group-hover:hidden font-bold text-lg">
                                                            {item.value}
                                                        </p>
                                                        <p
                                                            className="hidden group-hover:block font-bold text-lg text-center opacity-75"
                                                            style={
                                                                {
                                                                    color: item.color
                                                                }
                                                            }
                                                        >
                                                            <span>{item.percentage}</span>
                                                            <span>%</span>
                                                        </p>
                                                    </div>
                                                }
                                            />
                                        </div>
                                        <h2
                                            style={{ color: item.color }}
                                            className="text-sm font-semibold text-center"
                                        >
                                            {item.name}
                                        </h2>
                                    </div>
                                )
                            )
                        }
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
    )
}

export default OrderStatusStatistic