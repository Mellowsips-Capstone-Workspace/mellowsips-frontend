import { CustomTooltip } from 'modules/Common/Chart/CustomTooltip';
import WidgetCard from 'modules/Common/WidgetCard';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const data = [
    {
        month: 'Mon',
        pending: 5,
    },
    {
        month: 'Tue',
        pending: 30,
    },
    {
        month: 'Wed',
        pending: 60,
    },
    {
        month: 'Thu',
        pending: 70,
    },
    {
        month: 'Fri',
        pending: 90,
    },
    {
        month: 'Sat',
        pending: 30,
    },
    {
        month: 'Sun',
        pending: 35,
    },
];

export default function OpenSalesOrder({ className }: { className?: string }) {

    return (
        <WidgetCard
            title="Open Sales Order"
            description={880770}
            descriptionClassName="text-xl font-semibold text-gray-900 mt-1.5 2xl:text-2xl"
            className={className}
        >
            <p>Boxes pending since:</p>
            <div className="h-40 w-full">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <AreaChart
                        data={data}
                        margin={{
                            left: -24,
                        }}
                        className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
                    >
                        <defs>
                            <linearGradient id="pending" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#eab308" stopOpacity={0.12} />
                                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            className=" "
                        />
                        <YAxis tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="pending"
                            stroke="#eab308"
                            strokeWidth={2}
                            fill="url(#pending)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </WidgetCard>
    );
}
