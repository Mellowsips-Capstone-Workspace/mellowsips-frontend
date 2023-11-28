import useBoolean from "hooks/useBoolean"
import Button from "modules/Common/Button"
import showToast from "modules/Common/Toast"
import PopupTimeRange from "modules/Manager/components/OpenTimeManage/components/PopupTimeRange"
import { FC, useCallback } from "react"
import { DaySchedule, OperationalHours } from "types/store"

type AddOpenTimeProps = {
    times?: DaySchedule[]
    day: keyof OperationalHours
    add: (day: keyof OperationalHours, time: DaySchedule, callbackOnSuccess?: () => void) => void
}

const AddOpenTime: FC<AddOpenTimeProps> = ({ day, times, add }) => {
    const [display, setDisplay] = useBoolean(false)
    const { off } = setDisplay

    const handleAddTime = useCallback((time: DaySchedule) => {
        const isTimeOverlapping = Array.isArray(times) && times.some(
            (existTime) => {
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
        add(day, time)
        off()
    }, [times, day, add, off])
    return (
        <>
            <Button
                data-day={day}
                base="none"
                variant="indigo"
                className="px-2 text-xs py-0.5 rounded"
                onClick={setDisplay.on}
            >
                Thêm
            </Button>
            <PopupTimeRange
                closeModal={setDisplay.off}
                flag={display}
                time={{ start: "08:00", end: "20:00" }}
                onSelect={handleAddTime}
            />
        </>
    )
}

export default AddOpenTime