import AddOpenTime from "modules/Manager/components/OpenTimeManage/components/AddOpenTime"
import OpenTime from "modules/Manager/components/OpenTimeManage/components/OpenTime"
import { nanoid } from "nanoid"
import { FC } from "react"
import { DaySchedule, OperationalHours } from "types/store"

type HoursOfOperationProps = {
    day: keyof OperationalHours,
    times?: DaySchedule[]
    add: (day: keyof OperationalHours, time: DaySchedule, callbackOnSuccess?: () => void) => void
    update: (day: keyof OperationalHours, time: DaySchedule, index: number, callbackOnSuccess?: () => void) => void
    remove: (day: keyof OperationalHours, index: number, callbackOnSuccess?: () => void) => void
}

const HoursOfOperation: FC<HoursOfOperationProps> = ({ day, times, add, remove, update }) => {

    return (
        <div className="space-y-2">
            <p className="font-medium text-main-secondary" >
                {day === "MONDAY" ? "Thứ 2" : day === "TUESDAY" ? "Thứ 3" : day === "WEDNESDAY" ? "Thứ 4" : day === "THURSDAY" ? "Thứ 5" : day === "FRIDAY" ? "Thứ 6" : day === "SATURDAY" ? "Thứ 7" : day === "SUNDAY" ? "Chủ nhật" : null}
            </p>

            {
                (Array.isArray(times) && times.length) ? times.map(
                    (time, index, times) => (
                        <OpenTime
                            key={nanoid()}
                            time={time}
                            index={index}
                            remove={remove}
                            update={update}
                            day={day}
                            times={times}
                        />
                    )
                ) : (
                    <p className="text-sm italic text-gray-400">Tạm đóng cửa</p>
                )
            }
            <AddOpenTime
                add={add}
                day={day}
                key={nanoid()}
                times={times}
            />
            {day !== "SUNDAY" ? <hr></hr> : null}
        </div>
    )
}

export default HoursOfOperation