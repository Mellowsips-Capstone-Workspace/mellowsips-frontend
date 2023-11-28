import MetricCard from "modules/Common/Chart/MetricCard";
import ContainerHouseIcon from "modules/Common/Icons/container-house";
import ExpenseIcon from "modules/Common/Icons/expenses";
import ExpressDeliveryIcon from "modules/Common/Icons/express-delivery";
import RevenueUpIcon from "modules/Common/Icons/revenue-up";
import SalesIcon from "modules/Common/Icons/sales";
import TrendingDownIcon from "modules/Common/Icons/trending-down";
import TrendingUpIcon from "modules/Common/Icons/trending-up";
import WidgetCard from "modules/Common/WidgetCard";
import { cn } from "shadcn/utils";

const statData = [
    {
        id: '1',
        title: 'Costs',
        icon: <ExpenseIcon className="h-7 w-7" />,
        graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
        graphColor: 'text-red',
        metric: 57890,
        increased: true,
        percentage: '+4.40',
    },
    {
        id: '2',
        title: 'Revenue',
        icon: <RevenueUpIcon className="h-7 w-7" />,
        graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
        graphColor: 'text-green',
        metric: 1390,
        increased: true,
        percentage: '+32.40',
    },
    {
        id: '3',
        icon: <SalesIcon className="h-9 w-9" />,
        graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
        graphColor: 'text-green',
        title: 'Sales',
        metric: 12390,
        increased: true,
        percentage: '+32.40',
    },
    {
        id: '4',
        title: 'Shipments ',
        icon: <ContainerHouseIcon className="h-7 w-7" />,
        graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
        graphColor: 'text-green',
        metric: 12390,
        increased: true,
        percentage: '+32.40',
    },
    {
        id: '5',
        title: 'Avg. Delivery Time',
        icon: <ExpressDeliveryIcon className="h-7 w-7" />,
        graphIcon: <TrendingDownIcon className="me-1 h-4 w-4" />,
        graphColor: 'text-red',
        metric: '3 Days',
        decreased: true,
        percentage: '5.40',
    },
];


export default function StatCards({ className }: { className?: string }) {

    return (
        <WidgetCard
            rounded="lg"
            className={className}
            title="General Overview"
        >
            <div className="grid grid-flow-col gap-5 overflow-x-auto py-2">
                {
                    statData.map(
                        (stat) => (
                            <MetricCard
                                key={stat.title + stat.id}
                                title={stat.title}
                                metric={stat.metric}
                                icon={stat.icon}
                                titleClassName="capitalize"
                                iconClassName="h-16 w-16"
                                className="min-w-max"
                            >
                                <h1 className="mt-5 flex items-center leading-none text-gray-500">
                                    <span
                                        className={
                                            cn(
                                                'me-2 inline-flex items-center font-medium',
                                                stat.graphColor
                                            )
                                        }
                                    >
                                        {stat.graphIcon}
                                        {stat.percentage}%
                                    </span>
                                    <span className="me-1 hidden">
                                        {stat.increased ? 'Increased' : 'Decreased'}
                                    </span>
                                    <span>last month</span>

                                </h1>
                            </MetricCard>
                        )
                    )
                }
            </div>
        </WidgetCard>
    );
}
