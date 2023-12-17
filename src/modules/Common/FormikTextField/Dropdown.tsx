import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Popover from '@radix-ui/react-popover';
import { useField } from "formik";
import { isEmpty, isObject, isUndefined } from "lodash";
import { FC, MouseEvent, useCallback, useEffect, useRef } from "react";

type DropdownProps = {
    name: string
    placeholder?: string,
    options: {
        label: string
        value: string | null
    }[]
}

const Dropdown: FC<DropdownProps> = ({ name, placeholder = "Chọn ngày", options }) => {
    const [{ value }, { error, touched, }, { setValue, setTouched }] = useField<string | null>(name)
    const trigger = useRef<HTMLButtonElement>(null)

    const handleSelectValue = useCallback((event: MouseEvent<HTMLLIElement>) => {
        const { value } = event.currentTarget.dataset

        if (isUndefined(value)) {
            setValue(null, true)
            return
        }

        setValue(value, true)
    }, [setValue])


    useEffect(() => {
        setTouched(false)
    }, [setTouched])

    const currentValue = (options.length === 0) ? placeholder : options.find((item) => item.value === value)

    return (
        <Popover.Root >
            <Popover.Trigger
                asChild={true}
            >
                <button
                    type="button"
                    ref={trigger}
                    aria-invalid={!isEmpty(error) && touched}
                    className="flex min-w-full max-w-full outline-none py-2.5 rounded-2 border px-3 aria-invalid:border-danger transition-colors duration-300"
                >
                    <p className="text-left truncate grow">
                        {
                            isObject(currentValue) ? currentValue.label : placeholder
                        }
                    </p>
                    <ChevronDownIcon className="flex-none h-5 w-5" />
                </button>
            </Popover.Trigger>
            <Popover.Content
                align="start"
                className="min-w-full"
                style={{ zIndex: 10 }}
            >
                <ul
                    style={{ width: trigger.current?.offsetWidth }}
                    className="rounded-md list-none bg-white border overflow-hidden min-w-full max-h-32 overflow-y-auto scrollbar-sm"
                >
                    {
                        options.length ? options.map(
                            ({ label, value: dataValue }, index) => (
                                <Popover.Close
                                    key={index}
                                    asChild={true}
                                >
                                    <li
                                        data-value={dataValue}
                                        onClick={handleSelectValue}
                                        aria-current={value === dataValue}
                                        className="px-2 py-0.5 aria-current:bg-slate-200 hover:bg-slate-300 cursor-pointer transition-all"
                                    >
                                        {label}
                                    </li>
                                </Popover.Close>
                            )
                        ) : (
                            <li

                                className="px-2 py-0.5 aria-current:bg-slate-200 hover:bg-slate-300 cursor-pointer transition-all"
                            >
                                Không có dữ liệu
                            </li>
                        )
                    }
                </ul>
            </Popover.Content>

            {Boolean(error && touched) && <span className="text-danger text-xs">{error}</span>}
        </Popover.Root>
    )
}

export default Dropdown