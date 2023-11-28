import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parse } from "date-fns";
import { useField } from "formik";
import { isEmpty, isUndefined } from "lodash";
import { FC, useCallback, useEffect, useState } from "react";
import { Matcher } from "react-day-picker";
import { Calendar } from "shadcn/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "shadcn/ui/popover";

type DateInputProps = {
    name: string
    disabled?: Matcher
    placeholder?: string
}

const DateInput: FC<DateInputProps> = ({ name, placeholder = "Chọn ngày", disabled }) => {
    const [{ value }, { error, touched, }, { setValue, setTouched }] = useField<string>(name)

    const [date, setDate] = useState<Date | undefined>(isEmpty(value) ? undefined : parse(value, "dd/MM/yyyy", Date.now()))

    const onSelect = useCallback((date: Date | undefined) => {
        if (isUndefined(date)) {
            return
        }
        setDate(date)
        setValue(format(date, "dd/MM/yyyy"), true)
    }, [setValue])

    useEffect(() => {
        setTouched(false)
    }, [setTouched])

    return (
        <div>
            <Popover>
                <PopoverTrigger
                    asChild={true}
                >
                    <button
                        type="button"
                        className="flex w-full outline-none py-2.5 rounded-2 border px-3 aria-invalid:border-danger transition-colors duration-300"
                    >
                        <p className="text-left grow">
                            {
                                date ? format(date, "dd/MM/yyyy") : placeholder
                            }
                        </p>
                        <CalendarIcon className="flex-none h-5 w-5" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={onSelect}
                        disabled={disabled}
                    />
                </PopoverContent>
            </Popover>

            {Boolean(error && touched) && <span className="text-danger text-xs">{error}</span>}
        </div>
    )
}

export default DateInput