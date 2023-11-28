import { CalendarIcon } from "@radix-ui/react-icons";
import { isUndefined } from "lodash";
import { FC, useCallback, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "shadcn/ui/calendar";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "shadcn/ui/popover";
import { subtractDate } from "utils/date";

type DateRangeSelectProps = {
    initial: DateRange
    onSelect: (range: DateRange) => void | any
}

const DateRangeSelect: FC<DateRangeSelectProps> = ({ onSelect, initial }) => {
    const [range, setRange] = useState<DateRange>(
        initial ? initial : {
            from: subtractDate(new Date(), 7),
            to: new Date()
        }
    )

    const handleOnChange = useCallback((range: DateRange | undefined) => {
        if (isUndefined(range)) {
            return
        }
        setRange(range)

    }, [])

    const handlePick = () => {
        onSelect(range)
    }

    return (
        <Popover>
            <PopoverTrigger
                asChild={true}
            >
                <button
                    type="button"
                >
                    <CalendarIcon className="flex-none h-5 w-5 text-slate-500" />
                </button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="w-fit px-0 py-2 space-y-2"
            >
                <Calendar
                    className="px-5"
                    mode="range"
                    selected={range}
                    onSelect={handleOnChange}
                />
                <hr />
                <div className="px-5 flex justify-between">
                    <PopoverClose
                        disabled={isUndefined(range) || isUndefined(range.from)}
                        onClick={handlePick}
                        className="text-white text-xs px-2 py-0.5 rounded bg-indigo-500 disabled:opacity-50"
                    >
                        Chọn
                    </PopoverClose>
                    <PopoverClose className="text-white text-xs px-2 py-0.5 rounded bg-slate-500">
                        Huỷ
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>

    )
}

export default DateRangeSelect