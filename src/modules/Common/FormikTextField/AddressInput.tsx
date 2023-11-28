import { useField } from "formik";
import LocationHelper from "helpers/location";
import useBoolean from "hooks/useBoolean";
import useOutsideClick from "hooks/useOutsideClick";
import useAbortController from "hooks/useUnmountAbortSignal";
import { debounce, isEmpty } from "lodash";
import Loading from "modules/Common/Loading";
import { FC, MouseEvent, useCallback, useEffect, useMemo, useState } from "react";

const FindAddress: FC<{ address: string, setValue: (address: string, shouldValidate?: boolean) => void, off: () => void }> = ({ address, setValue, off }) => {
    const [predictions, setPredictions] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const ref = useOutsideClick<HTMLDivElement>(off)

    const [getAbortController, abort] = useAbortController(true)

    const handleSearch = useCallback(async (address: string) => {

        abort("Aborted!", true)
        setLoading(true)
        const addressValue = address.trim()

        if (isEmpty(addressValue)) {
            setLoading(false)
            setPredictions([])
            return
        }

        const abortController: AbortController = getAbortController()

        const { error, status, body } = await LocationHelper.findAddress(addressValue, abortController)
        setLoading(false)
        if (error || status !== 200 || isEmpty(body) || abortController.signal.aborted || body.status !== "OK" || !Array.isArray(body.predictions)) {
            setPredictions([])
            return
        }

        setPredictions(body.predictions.map(({ description }) => description))
    }, [abort, getAbortController])

    const searchDebounce = useMemo(() => {
        return debounce(handleSearch, 500, { trailing: true })
    }, [handleSearch])

    useEffect(() => {
        searchDebounce(address)
    }, [address, searchDebounce])

    const handleSelect = useCallback((event: MouseEvent<HTMLLIElement>) => {
        const value = event.currentTarget.dataset.value!
        off()

        setValue(value, true)
    }, [off, setValue])

    return (
        <div
            ref={ref}
        >
            {
                loading ? (
                    <div
                        className="px-3 hover:bg-medium transition-colors duration-300 cursor-pointer"
                    >
                        <div className="w-max mx-auto">
                            <Loading.Circle size={16} className="mx-auto text-main-primary" />
                            <p className="text-xs text-gray-500">Đang tìm địa chỉ</p>
                        </div>
                    </div>
                ) : predictions.length ? (
                    <ul
                        className="rounded max-h-80 list-none space-y-1 bg-white border shadow overflow-y-auto"
                    >
                        {
                            predictions.map(
                                prediction => (
                                    <li
                                        key={prediction}
                                        data-value={prediction}
                                        onClick={handleSelect}
                                        className="px-3 hover:bg-medium transition-colors duration-300 cursor-pointer"
                                    >
                                        {prediction}
                                    </li>
                                )
                            )
                        }
                    </ul>
                ) : null
            }
        </div>
    )
}

const AddressInput: FC<{ name: string, placeholder?: string }> = ({ name, placeholder }) => {
    const [{ onBlur, value, onChange }, { error, touched }, { setTouched, setValue }] = useField<string>(name);
    const [displaySuggest, setDisplaySuggest] = useBoolean(false)
    const { on, off } = setDisplaySuggest

    useEffect(() => {
        setTouched(false)
    }, [setTouched])

    return (
        <div className="relative z-auto">
            <input
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onInput={displaySuggest ? undefined : on}
                placeholder={placeholder}
                className="w-full outline-none py-2.5 rounded-2 border px-3 aria-invalid:border-danger transition-colors duration-300"
                aria-invalid={Boolean(error && touched)}
            />

            {
                displaySuggest ? (
                    <div className="absolute z-10 min-w-full mt-2">
                        <FindAddress
                            off={off}
                            address={value}
                            setValue={setValue}
                        />
                    </div>
                ) : null
            }
            {Boolean(error && touched) && <span className="text-danger text-xs">{error}</span>}
        </div>
    )
}

export default AddressInput