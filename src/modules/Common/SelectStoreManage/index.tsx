import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Popover from '@radix-ui/react-popover';
import { isEmpty, isNull, isUndefined } from "lodash";
import Loading from "modules/Common/Loading";
import { nanoid } from "nanoid";
import { FC, MouseEvent, useCallback, useMemo } from "react";
import Store from "types/store";

type SelectStoreManageProps = {
    loading: boolean
    stores: Store[]
    storeId: string | undefined | null
    setStoreId: (storeId: string | null) => void
    onStoreChange?: (storeId: string | null) => void
    showSelectAll?: boolean
}

const SelectStoreManage: FC<SelectStoreManageProps> = ({ loading, stores, onStoreChange, storeId, setStoreId, showSelectAll = false }) => {

    const handleSelectValue = useCallback((event: MouseEvent<HTMLLIElement>) => {
        const { value } = event.currentTarget.dataset
        const storeId = isUndefined(value) ? null : value
        setStoreId(storeId)
        if (isUndefined(onStoreChange)) {
            return
        }
        onStoreChange(storeId)
    }, [onStoreChange, setStoreId])

    const storeSelected = useMemo(() => {
        return stores.find(({ id }) => storeId === id) || null
    }, [storeId, stores])

    return (
        <div className="w-full">
            {
                loading ? (
                    <div className="flex justify-center items-center space-x-1 p-2 text-xs border rounded">
                        <Loading.Circle className="text-main-primary" size={14} />
                        <span className="text-gray-400">Đang tải danh sách cửa hàng</span>
                    </div>
                ) : stores ? (
                    <Popover.Root >
                        <Popover.Trigger
                            asChild={true}
                        >
                            <button
                                type="button"
                                className="flex min-w-full outline-none py-1.5 rounded-2 border px-3 bg-white"
                            >

                                <p className="text-left grow">
                                    {
                                        isNull(storeSelected) ? "Tất cả" : (isEmpty(storeSelected) || stores.length === 0) ? "Chọn cửa hàng" : storeSelected.name
                                    }
                                </p>
                                <ChevronDownIcon className="flex-none h-5 w-5" />
                            </button>
                        </Popover.Trigger>
                        <Popover.Content
                            align="start"
                            style={{ zIndex: 10 }}
                        >
                            <ul
                                className="mt-1 py-2 rounded-md list-none bg-white border w-full max-h-20 overflow-y-auto scrollbar-sm"
                                style={{ width: "var(--radix-popper-anchor-width)" }}
                            >
                                {
                                    stores.length ? (
                                        <>
                                            {
                                                stores.map(
                                                    ({ name, id }) => (
                                                        <Popover.Close
                                                            key={id}
                                                            asChild
                                                        >
                                                            <li
                                                                key={id}
                                                                data-value={id}
                                                                onClick={handleSelectValue}
                                                                aria-current={id === storeId}
                                                                className="px-2 py-0.5 aria-current:bg-slate-200 hover:bg-slate-300 cursor-pointer transition-all"
                                                            >
                                                                {name}
                                                            </li>
                                                        </Popover.Close>
                                                    )
                                                )
                                            }
                                            {
                                                showSelectAll ? (
                                                    <Popover.Close
                                                        key={nanoid()}
                                                        asChild
                                                    >
                                                        <li
                                                            key={nanoid()}
                                                            data-value={null}
                                                            onClick={handleSelectValue}
                                                            aria-current={null === storeId}
                                                            className="px-2 py-0.5 aria-current:bg-slate-200 hover:bg-slate-300 cursor-pointer transition-all"
                                                        >
                                                            Tất cả cửa hàng
                                                        </li>
                                                    </Popover.Close>
                                                ) : null
                                            }
                                        </>
                                    ) : (
                                        <li

                                            className="px-2 py-0.5 aria-current:bg-slate-200 hover:bg-slate-300 cursor-pointer transition-all"
                                        >
                                            Không có dữ liệu
                                        </li>
                                    )
                                }
                            </ul>
                        </Popover.Content >

                    </Popover.Root >
                ) : null
            }
        </div >
    )
}

export default SelectStoreManage