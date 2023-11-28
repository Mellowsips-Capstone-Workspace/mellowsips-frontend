import { MinusIcon, Pencil2Icon } from "@radix-ui/react-icons"
import useBoolean from "hooks/useBoolean"
import Button from "modules/Common/Button"
import showToast from "modules/Common/Toast"
import PopupTimeRange from "modules/Manager/components/OpenTimeManage/components/PopupTimeRange"
import Time from "modules/Manager/components/OpenTimeManage/components/Time"
import { FC, useCallback } from "react"
import { DaySchedule, OperationalHours } from "types/store"


type OpenTimeProps = {
    index: number
    day: keyof OperationalHours,
    time: DaySchedule
    times?: DaySchedule[]
    update: (day: keyof OperationalHours, time: DaySchedule, index: number) => void
    remove: (day: keyof OperationalHours, index: number) => void
}

const OpenTime: FC<OpenTimeProps> = ({ day, time, index, times, remove, update }) => {
    const [displayEdit, setDisplayEdit] = useBoolean(false)
    const { off } = setDisplayEdit

    const handleRemoveTime = useCallback(() => {
        remove(day, index)
    }, [day, remove, index])

    const handleUpdate = useCallback((time: DaySchedule) => {
        const isTimeOverlapping = Array.isArray(times) && times.some(
            (existTime, position) => {
                if (position === index) {
                    return false
                }
                const leftSide = time.start.localeCompare(existTime.start) < 0 && time.end.localeCompare(existTime.start) < 0
                const rightSide = time.start.localeCompare(existTime.end) > 0 && time.end.localeCompare(existTime.end) > 0
                return !(leftSide || rightSide)
            }
        )

        if (isTimeOverlapping) {
            showToast({
                type: "warning",
                title: "Thời gian không hợp lệ.",
                message: "Khoảng thời gian bạn vừa chọn đã bị trùng với một khung giờ khác."
            })
            return
        }
        update(day, time, index)
        off()
    }, [day, update, index, times, off])

    return (
        <div className="space-y-2">
            <div className="flex space-x-2">
                <div className='flex items-center space-x-1 rounded'>
                    <Time start time={time?.start} />
                    <span className='text-gray-500'>
                        <MinusIcon />
                    </span>
                    <Time time={time?.end} />
                </div>
                <Button
                    type="button"
                    base="none"
                    variant="transparent"
                    className="text-xs rounded text-gray-400 hover:text-red-500"
                    onClick={setDisplayEdit.on}
                >
                    <Pencil2Icon height={20} width={20} />
                </Button>
                <Button
                    type="button"
                    base="none"
                    variant="transparent"
                    data-index={index}
                    className="text-xs rounded text-gray-400 hover:text-red-500"
                    onClick={handleRemoveTime}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                </Button>
            </div>
            <PopupTimeRange
                flag={displayEdit}
                closeModal={setDisplayEdit.off}
                time={time}
                onSelect={handleUpdate}
            />
        </div>
    )
}

export default OpenTime