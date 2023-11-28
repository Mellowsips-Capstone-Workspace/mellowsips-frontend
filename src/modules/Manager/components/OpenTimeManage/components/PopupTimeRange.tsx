import { CaretDownIcon, ClockIcon, StopwatchIcon } from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"
import { isUndefined } from "lodash"
import Button from "modules/Common/Button"
import Modal from "modules/Common/Modal/Modal"
import { FC, useCallback, useMemo, useState } from "react"
import { DaySchedule } from "types/store"

type SelectHourProps = {
    time: string
    field: keyof DaySchedule
    setTime: (key: keyof DaySchedule, value) => void
}

const SelectHour: FC<SelectHourProps> = ({ time, setTime, field }) => {
    const setHour = useCallback((value: string) => {
        setTime(field, value)
    }, [field, setTime])

    return (
        <SelectPrimitive.Root
            onValueChange={setHour}
            value={time}
        >
            <SelectPrimitive.Trigger asChild>
                <button className="py-1 rounded border flex items-center justify-center font-medium">
                    <span className="px-1">{time.split(":").at(0)}</span>
                    <span className='text-gray-500'>
                        <CaretDownIcon height={20} width={20} />
                    </span>
                </button>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Content
                align="start"
                className="space-y-1 h-40 overflow-y-auto bg-white border shadow scrollbar-xs rounded w-12"
            >
                {
                    Array(24).fill(0).map(
                        (_, index) => (
                            <SelectPrimitive.Item
                                key={index}
                                value={`${index.toString().padStart(2, "0")}:${time.split(":").at(-1)}`}
                                aria-current={index.toString().padStart(2, "0") === time.split(":").at(0)}
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

type SelectMinuteProps = SelectHourProps & {
    minuteStep?: number
}

const SelectMinute: FC<SelectMinuteProps> = ({ minuteStep, time, setTime, field }) => {
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


    const setMinute = useCallback((value: string) => {
        setTime(field, value)
    }, [field, setTime])

    return (
        <SelectPrimitive.Root
            onValueChange={setMinute}
            value={time}
        >
            <SelectPrimitive.Trigger asChild>
                <button className="py-1 rounded border flex items-center justify-center font-medium">
                    <span className="px-1">{time.split(":").at(-1)}</span>
                    <span className='text-gray-500'>
                        <CaretDownIcon height={20} width={20} />
                    </span>
                </button>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Content
                align="start"
                className="space-y-1 h-40 overflow-y-auto bg-white border shadow scrollbar-xs rounded w-12"
            >
                {
                    minutes.map(
                        (minute) => (
                            <SelectPrimitive.Item
                                key={minute}
                                value={`${time.split(":").at(0)}:${minute.toString().padStart(2, "0")}`}
                                aria-current={minute.toString().padStart(2, "0") === time.split(":").at(-1)}
                                className="mx-auto w-8 flex items-center justify-center aspect-square cursor-pointer aria-current:bg-slate-400 aria-current:text-white aria-current:pointer-events-none hover:bg-slate-200 rounded"

                            >
                                {minute.toString().padStart(2, "0")}
                            </SelectPrimitive.Item>
                        )
                    )
                }
            </SelectPrimitive.Content>
        </SelectPrimitive.Root>
    )
}

type PopupTimeRangeProps = {
    time: DaySchedule
    flag: boolean
    closeModal: () => void
    onSelect?: (time: DaySchedule) => void
}

const PopupTimeRange: FC<PopupTimeRangeProps> = ({ time: initTime, flag, closeModal, onSelect }) => {

    const [time, setTime] = useState<DaySchedule>(initTime)

    const setFiledTime = useCallback((filed: keyof DaySchedule, value: string) => {
        setTime(time => ({ ...time, [filed]: value }))
    }, [])

    const handleSelect = () => {
        if (isUndefined(onSelect)) {
            return
        }
        onSelect(time)
    }

    const invalidTime = time.start.localeCompare(time.end) !== -1

    return (
        <Modal
            flag={flag}
            closeModal={closeModal}
            closeOutside={false}
            className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
            innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
        >
            <div className='space-y-5'>
                <p className="px-5 py-2 shadow border-b truncate font-medium">Chọn thời gian mở cửa</p>
                <div className='space-y-5'>
                    <div className="px-5 space-x-5 flex w-fit">
                        <div className="space-y-1">
                            <div className="w-fit flex space-x-1 items-center">
                                <ClockIcon className="text-gray-500" height={13} width={13} />
                                <span className="text-xs text-gray-500">Thời gian mở</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div>
                                    <SelectHour
                                        field="start"
                                        setTime={setFiledTime}
                                        time={time.start}
                                    />
                                </div>
                                <span className="text-gray-500">:</span>
                                <div>
                                    <SelectMinute
                                        field="start"
                                        setTime={setFiledTime}
                                        time={time.start}
                                        minuteStep={5}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="w-fit flex space-x-1 items-center">
                                <StopwatchIcon className="text-gray-500" height={13} width={13} />
                                <span className="text-xs text-gray-500">Thời gian đóng</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div>
                                    <SelectHour
                                        field="end"
                                        setTime={setFiledTime}
                                        time={time.end}
                                    />
                                </div>
                                <span className="text-gray-500">:</span>
                                <div>
                                    <SelectMinute
                                        field="end"
                                        setTime={setFiledTime}
                                        time={time.end}
                                        minuteStep={5}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        invalidTime ? (
                            <p className="px-5 text-xs italic text-orange-500">Khung thời gian lựa chọn không hợp lệ</p>
                        ) : (
                            <p className="px-5 text-xs italic text-gray-500 space-x-1">
                                <span>Cửa hàng mở cửa từ</span>
                                <span className="font-medium text-indigo-500">{time.start}</span>
                                <span >đến</span>
                                <span className="font-medium text-red-500">{time.end}</span>
                            </p>
                        )
                    }

                    <div className="border-t py-2 px-5 flex justify-end space-x-5">
                        <Button
                            type="button"
                            variant="indigo"

                            onClick={invalidTime ? undefined : handleSelect}
                            className="disabled:hidden disabled:opacity-0 opacity-100 transition-all"
                            disabled={invalidTime}
                        >
                            Chọn
                        </Button>
                        <Button
                            type="button"
                            variant="default"
                            onClick={closeModal}
                        >
                            Huỷ
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PopupTimeRange