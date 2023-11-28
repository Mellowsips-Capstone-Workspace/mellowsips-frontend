
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { cn } from 'shadcn/utils';


const data = [
    { name: 'Memory:', value: 20000, color: '#3872FA' },
    { name: '47C', value: 18000, color: '#eab308' },
    { name: 'Lê Văn Việt:', value: 35000, color: '#10b981' },
];

const RADIAN = Math.PI / 180;
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
    );
};

export default function FleetStatus({ className }: { className?: string }) {
    return (
        <div className={cn("border p-5 bg-white rounded", className)}>
            <h3
                className="col-span-full mb-8 text-base font-semibold sm:text-lg"
            >
                Doanh số theo cửa hàng
            </h3>
            <div className="w-full">
                <div className='mx-auto h-80 w-h-80'>
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
                                <span>{item.value}</span>
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
                    <span>73.000.000 đ</span>
                </div>
            </div>
        </div>
    )
}