import { isUndefined } from "lodash";
import { FC, MouseEvent, useMemo } from "react";
import { DaySchedule } from "types/store";

type SelectHourProps = {
    time: string
    field: keyof DaySchedule
    setTime: (key: keyof DaySchedule, value) => void
}

const Hour: FC<SelectHourProps> = ({ time, setTime, field }) => {
    const setHour = (event: MouseEvent<HTMLDivElement>) => {
        const hour = event.currentTarget.dataset.hour!
        setTime(field, `${hour.padStart(2, "0")}:${time.split(":").at(-1)}`)
    }

    return (
        <div className="h-20 space-y-1 overflow-y-auto scrollbar-xs border-r">
            {
                Array(24).fill(0).map(
                    (_, index) => (
                        <div
                            key={index}
                            onClick={setHour}
                            data-hour={index}
                            aria-current={index.toString().padStart(2, "0") === time.split(":").at(0)}
                            className="mx-auto w-8 flex items-center justify-center aspect-square cursor-pointer aria-current:bg-slate-400 aria-current:text-white aria-current:pointer-events-none hover:bg-slate-200 rounded"
                        >
                            {index.toString().padStart(2, "0")}
                        </div>
                    )
                )
            }
        </div>
    )
}

type SelectMinuteProps = SelectHourProps & {
    minuteStep?: number
}
const Minute: FC<SelectMinuteProps> = ({ minuteStep, time, setTime, field }) => {
    const minutes = useMemo(() => {
        const minutes: number[] = []
        if (!Number.isInteger(minuteStep) || isUndefined(minuteStep)) {
            return minutes
        }

        const minuteStepValue = minuteStep > 59 ? minuteStep - 59 : minuteStep
        for (let i = 0; i <= 59; i += minuteStepValue) {
            minutes.push(i)
        }

        if (minutes.at(-1)! < 59) {
            minutes.push(59)
        }

        return minutes
    }, [minuteStep])


    const setMinute = (event: MouseEvent<HTMLDivElement>) => {
        const minute = event.currentTarget.dataset.minute!
        setTime(field, `${time.split(":").at(0)}:${minute.padStart(2, "0")}`)
    }

    return (
        <div className="h-20 space-y-1 overflow-y-auto scrollbar-xs">
            {
                minutes.map(
                    (minute) => (
                        <div
                            key={minute}
                            onClick={setMinute}
                            data-minute={minute}
                            aria-current={minute.toString().padStart(2, "0") === time.split(":").at(-1)}
                            className="mx-auto w-8 flex items-center justify-center aspect-square cursor-pointer aria-current:bg-slate-400 aria-current:text-white aria-current:pointer-events-none hover:bg-slate-200 rounded"

                        >
                            {minute.toString().padStart(2, "0")}
                        </div>
                    )
                )
            }
        </div>
    )
}

const SelectTime = { Minute, Hour }

export default SelectTime