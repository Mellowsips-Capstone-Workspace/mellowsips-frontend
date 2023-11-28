import TagIcon from 'modules/Common/Icons/tag';
import TicketIcon from 'modules/Common/Icons/ticket';
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { cn } from 'shadcn/utils';

const data = [
    { name: 'Available', value: 22 },
    { name: 'Total used', value: 78 },
]
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
                    {props.value1} Mã
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

export default function StorageSummary({ className }: { className?: string }) {
    return (
        <div className={cn("space-y-2", className)}>
            <div className='bg-white rounded border'>
                <h2 className='p-5 font-medium text-xl'>Giảm giá</h2>
                <div className="h-72 w-full">
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
                                        <CustomLabel value1={data[1].value} value2={'Được sử dụng 100'} />
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
                <div className="p-5">
                    {data.map((item, index) => (
                        <div
                            key={item.name}
                            className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 last:mb-0 last:border-0 last:pb-0"
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
                            <span>{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white p-5 border rounded grid gap-5">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-12 w-12 items-center justify-center">
                        <TicketIcon className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-base font-semibold text-gray-900">25 mã</p>
                        <p>Giảm theo phần trăm</p>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <div className="flex h-12 w-12 items-center justify-center">
                        <TagIcon className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="text-base font-semibold text-gray-900">13 mã</p>
                        <p>Giảm theo giá trị</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
