import { CalendarIcon, CaretDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import { format } from "date-fns";
import { useField } from "formik";
import { isEmpty, isUndefined } from "lodash";
import { FC, MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Matcher } from "react-day-picker";
import { Calendar } from "shadcn/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "shadcn/ui/popover";
import { parseGMT7 } from "utils/date";

type SelectHourProps = {
    hour: number
    setHour: (hour: string) => void
}

const SelectHour: FC<SelectHourProps> = ({ hour, setHour }) => {
    const onHourChange = useCallback((value: string) => {
        setHour(value)
    }, [setHour])

    return (
        <SelectPrimitive.Root
            onValueChange={onHourChange}
            value={hour.toString()}
        >
            <SelectPrimitive.Trigger asChild>
                <button className="py-1 rounded border flex items-center justify-center font-medium">
                    <span className="px-1">{hour.toString().padStart(2, "0")}</span>
                    <span className='text-gray-500'>
                        <CaretDownIcon height={20} width={20} />
                    </span>
                </button>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Content
                align="start"
                className="space-y-1 h-20 overflow-y-auto bg-white border shadow scrollbar-xs rounded w-12"
            >
                {
                    Array(24).fill(0).map(
                        (_, index) => (
                            <SelectPrimitive.Item
                                key={index}
                                value={index.toString().padStart(2, "0")}
                                aria-current={index === hour}
                                className="flex items-center justify-center cursor-pointer aria-current:bg-slate-400 aria-current:text-white aria-current:pointer-events-none hover:bg-slate-200"
                            >
                                {index.toString().padStart(2, "0")}
                            </SelectPrimitive.Item>
                        )
                    )
                }
            </SelectPrimitive.Content>
        </SelectPrimitive.Root>
    )
}

type SelectMinuteProps = {
    minute: number
    setMinute: (hour: string) => void
    minuteStep?: number
}

const SelectMinute: FC<SelectMinuteProps> = ({ minuteStep, minute, setMinute }) => {
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


    const onMinuteChange = useCallback((value: string) => {
        setMinute(value)
    }, [setMinute])

    return (
        <SelectPrimitive.Root
            onValueChange={onMinuteChange}
            value={minute.toString()}
        >
            <SelectPrimitive.Trigger asChild>
                <button className="py-1 rounded border flex items-center justify-center font-medium">
                    <span className="px-1">{minute.toString().padStart(2, "0")}</span>
                    <span className='text-gray-500'>
                        <CaretDownIcon height={20} width={20} />
                    </span>
                </button>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Content
                align="start"
                className="space-y-1 h-20 overflow-y-auto bg-white border shadow scrollbar-xs rounded w-12"
            >
                {
                    minutes.map(
                        (minuteUnit) => (
                            <SelectPrimitive.Item
                                key={minuteUnit}
                                value={minuteUnit.toString()}
                                aria-current={minute === minuteUnit}
                                className="mx-auto w-8 flex items-center justify-center aspect-square cursor-pointer aria-current:bg-slate-400 aria-current:text-white aria-current:pointer-events-none hover:bg-slate-200 rounded"

                            >
                                {minuteUnit.toString().padStart(2, "0")}
                            </SelectPrimitive.Item>
                        )
                    )
                }
            </SelectPrimitive.Content>
        </SelectPrimitive.Root>
    )
}


type VoucherDateTimeInputProps = {
    name: string
    disabled?: Matcher
    placeholder?: string
}

const VoucherDateTimeInput: FC<VoucherDateTimeInputProps> = ({ name, placeholder = "Chọn ngày", disabled }) => {
    const [{ value }, { error, touched, }, { setValue, setTouched }] = useField(name)
    const [date, setDate] = useState<Date | undefined>(isEmpty(value) ? undefined : parseGMT7(value))

    const onSelect = useCallback((date: Date | undefined) => {
        if (isUndefined(date)) {
            return
        }
        setDate(date)
        setValue(date, true)
    }, [setValue])

    const setHour = (hour: string) => {
        setDate(
            date => {
                const dateUpdate = new Date(date!.getTime())
                dateUpdate.setHours(parseInt(hour))
                setValue(dateUpdate, true)
                return dateUpdate
            }
        )
    }
    const setMinute = (minute: string) => {
        setDate(
            date => {
                const dateUpdate = new Date(date!.getTime())
                dateUpdate.setMinutes(parseInt(minute))
                setValue(dateUpdate, true)
                return dateUpdate
            }
        )
    }

    const handleRemoveDateTime = useCallback((event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation()
        setValue(null, true)
        setDate(undefined)
    }, [setValue])

    useEffect(() => {
        setTouched(false)
    }, [setTouched])

    return (
        <div key={name}>
            <Popover>
                <PopoverTrigger
                    asChild={true}
                    key={name}
                >
                    <button
                        type="button"
                        aria-invalid={Boolean(error && touched)}
                        className="flex w-full outline-none py-2.5 rounded-2 border px-3 aria-invalid:border-danger transition-colors duration-300"
                    >
                        <p className="text-left grow">
                            {
                                date ? format(date, "dd/MM/yyyy HH:mm") : placeholder
                            }
                        </p>
                        {
                            date ? (
                                <span
                                    key={name}
                                    className="mx-2 flex-none h-5 w-5 text-gray-100 hover:text-gray-500 transition-all duration-300"
                                    onClick={handleRemoveDateTime}
                                >
                                    <CrossCircledIcon className="h-full w-full" />
                                </span>
                            ) : null
                        }
                        <CalendarIcon className="flex-none h-5 w-5" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        key={name}
                        mode="single"
                        selected={date}
                        onSelect={onSelect}
                        disabled={disabled}
                    />
                    <div
                        aria-disabled={isUndefined(date)}
                        className="px-5 pb-4 flex justify-center items-center aria-disabled:opacity-20 aria-disabled:pointer-events-none"

                    >
                        <div className="w-fit">
                            <SelectHour
                                hour={date ? date.getHours() : 0}
                                setHour={setHour}
                            />
                        </div>
                        <span className="px-1">:</span>
                        <div className="w-fit">
                            <SelectMinute
                                minute={date ? date.getMinutes() : 0}
                                setMinute={setMinute}
                                minuteStep={1}
                            />
                        </div>
                    </div>

                </PopoverContent>
            </Popover>

            {Boolean(error && touched) && <span className="text-danger text-xs">{error}</span>}
        </div>
    )
}

export default VoucherDateTimeInput