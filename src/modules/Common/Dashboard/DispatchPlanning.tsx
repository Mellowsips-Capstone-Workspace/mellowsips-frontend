import CircleProgressBar from "modules/Common/Chart/CircleProgressbar";
import WidgetCard from "modules/Common/WidgetCard";

const data = [
    {
        name: 'Đang chuẩn bị',
        value: '30,000',
        percentage: 45,
        color: '#3872FA',
    },
    {
        name: 'Hoàn thành',
        value: '75%',
        percentage: 75,
        color: '#10b981',
    },
    {
        name: 'Từ chối',
        value: '67%',
        percentage: 67,
        color: '#f1416c',
    }
]

export default function DispatchPlanning({
    className,
}: {
    className?: string;
}) {
    return (
        <WidgetCard
            title="Lập kế hoạch điều phối"
            description={
                <p className="space-x-1">
                    <span className="text-xl font-semibold text-gray-900 2xl:text-2xl">
                        56,000
                    </span>
                    <span>Đơn</span>
                </p>
            }
            descriptionClassName="mt-2"
            headerClassName="col-span-full"
            className={className}
        >
            <div className="grid grid-cols-3 gap-8">

                {
                    data.map(
                        (item) => (
                            <div
                                key={item.name}
                                className="space-y-5"
                            >
                                <CircleProgressBar
                                    percentage={item.percentage}
                                    size={120}
                                    stroke="#f0f0f0"
                                    strokeWidth={5}
                                    progressColor={item.color}
                                    useParentResponsive={true}
                                    label={
                                        <h2 className="text-sm font-bold text-gray-900 dark:text-gray-700 2xl:text-base">
                                            {item.value}
                                        </h2>
                                    }
                                    strokeClassName="dark:stroke-gray-200"
                                />
                                <h2 className="text-xs font-semibold text-gray-900 text-center">
                                    {item.name}
                                </h2>
                            </div>
                        ))}
            </div>
            <p className="text-sm">Đang chờ giao - 1.000</p>
        </WidgetCard>
    )
}
