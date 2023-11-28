import { camelCase } from "lodash";
import { cn } from "shadcn/utils";

function isValidHexColor(colorCode: string) {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexColorRegex.test(colorCode);
}

export function CustomTooltip({ active, payload, label, className }: any) {
    if (!active) return null;
    return (
        <div
            className={
                cn(
                    'overflow-hidden rounded-md border border-gray-300 bg-gray-0 shadow-2xl dark:bg-gray-100',
                    className
                )
            }
        >
            <h2 className="p-2 px-2.5 text-center text-xs font-semibold capitalize text-gray-600 dark:bg-gray-200/60 dark:text-gray-700">
                {label}
            </h2>
            <div className="px-3 py-1.5 text-xs">
                {
                    payload.map(
                        (item: any, index: number) => (
                            <div
                                key={item.dataKey + index}
                                className="chart-tooltip-item flex items-center py-1.5"
                            >
                                <span
                                    className="me-1.5 h-2 w-2 rounded-full"
                                    style={{
                                        backgroundColor: isValidHexColor(item.fill)
                                            ? item.fill === '#fff'
                                                ? item.stroke
                                                : item.fill
                                            : item.stroke,
                                    }}
                                />
                                <p className="space-x-1">
                                    <span className="capitalize">
                                        {camelCase(item.dataKey)}
                                    </span>
                                    <span>
                                        {item.value}
                                    </span>
                                </p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
