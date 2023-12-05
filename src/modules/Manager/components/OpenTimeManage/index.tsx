import ROLE from "enums/role"
import { isEmpty } from "lodash"
import Button from "modules/Common/Button"
import showToast from "modules/Common/Toast"
import HoursOfOperation from "modules/Manager/components/OpenTimeManage/components/HoursOfOperation"
import { StoreContext, StoreContextType } from "modules/Manager/components/Store/contexts/StoreContext"
import { HTMLAttributes, forwardRef, useCallback, useContext, useRef, useState } from "react"
import StoreService from "services/StoreService"
import { useAppSelector } from "stores/root"
import { DaySchedule, OperationalHours } from "types/store"

const OpenTimeManage = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ ...props }, ref) => {
        const { store, updateStore } = useContext<StoreContextType>(StoreContext)!
        const { type } = useAppSelector(state => state.authenticate.principle!)


        const initOperationalHours = useRef<OperationalHours>(
            store.operationalHours ? store.operationalHours : {
                MONDAY: undefined,
                TUESDAY: undefined,
                WEDNESDAY: undefined,
                THURSDAY: undefined,
                FRIDAY: undefined,
                SATURDAY: undefined,
                SUNDAY: undefined
            }
        )

        const [operationalHours, setOperationalHours] = useState<OperationalHours>(initOperationalHours.current)

        const week = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"] as const

        const addTime = useCallback((day: typeof week[number], time: DaySchedule) => {
            setOperationalHours(
                operationalHours => {
                    const times = Array.isArray(operationalHours[day]) ? operationalHours[day]! : []
                    return (
                        {
                            ...operationalHours,
                            [day]: [...times, time].sort(
                                (first, second) => first.start.localeCompare(second.start)
                            )
                        }
                    )

                }
            )
        }, [])

        const updateTime = useCallback((day: typeof week[number], time: DaySchedule, index: number) => {
            setOperationalHours(
                operationalHours => {
                    const times = [...operationalHours[day]!]
                    times.splice(index, 1, time)

                    return (
                        {
                            ...operationalHours,
                            [day]: times.sort(
                                (first, second) => first.start.localeCompare(second.start)
                            )
                        }
                    )
                }
            )
        }, [])

        const removeTime = useCallback((day: typeof week[number], index: number) => {
            setOperationalHours(
                operationalHours => {
                    const times = Array.isArray(operationalHours[day]) ? [...operationalHours[day]!] : []
                    times.splice(index, 1)
                    return (
                        {
                            ...operationalHours,
                            [day]: times
                        }
                    )
                }
            )
        }, [])

        const reset = useCallback(() => {
            setOperationalHours(initOperationalHours.current)
        }, [])

        const saveChange = async () => {

            if (Object.values(operationalHours).every(value => value === null || value === undefined)) {
                return
            }

            const { status, body } = await StoreService.updateStore(
                store.id,
                {
                    operationalHours
                }
            )

            if (status === 200 && !isEmpty(body)) {
                initOperationalHours.current = operationalHours
                updateStore(
                    "operationalHours",
                    operationalHours
                )
                showToast(
                    {
                        type: "success",
                        title: "Thành công",
                        message: "Cập nhật giờ mở cửa thành công."
                    }
                )
                return
            }

            showToast(
                {
                    type: "warning",
                    title: "Thất bại",
                    message: "Cập nhật giờ mở cửa thất bại."
                }
            )
        }



        return (
            <div ref={ref} {...props}>
                <div className="flex justify-between items-center">
                    <h3 className="font-medium text-main-primary">Giờ hoạt động</h3>
                    {
                        [ROLE.OWNER, ROLE.STORE_MANAGER].includes(type) ? (
                            <div className="space-x-2">
                                <Button
                                    type="button"
                                    variant="default"
                                    className="text-xs"
                                    onClick={reset}
                                >
                                    Đặt lại
                                </Button>
                                <Button
                                    type="button"
                                    variant="orange"
                                    className="text-xs"
                                    onClick={saveChange}
                                >
                                    Lưu thay đổi
                                </Button>
                            </div>

                        ) : null
                    }
                </div>

                <div className="space-y-2 mt-5">
                    {
                        week.map(
                            day => (
                                <HoursOfOperation
                                    key={day}
                                    day={day}
                                    times={operationalHours[day]}
                                    add={addTime}
                                    remove={removeTime}
                                    update={updateTime}
                                />
                            )
                        )
                    }
                </div>
            </div>
        )
    }
)

export default OpenTimeManage