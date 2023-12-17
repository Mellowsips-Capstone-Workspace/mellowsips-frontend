import VietQRHelper from "helpers/vietQR"
import useAbortController from "hooks/useUnmountAbortSignal"
import { debounce, isEmpty } from "lodash"
import Loading from "modules/Common/Loading"
import NoResult from "modules/Common/NoResult"
import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from "react"

const TaxCodeLookup: FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [getAbortController, abort] = useAbortController(true)
    const [keyword, setKeyword] = useState("")
    const [result, setResult] = useState<{ code: string, desc: string, data: { id: string, name: string, address: string } | null }>()

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value)
    }, [])

    const handleSearch = useCallback(async (taxCode: string) => {
        abort("Aborted!", true)
        setLoading(true)
        const taxCodeValue = taxCode.trim()

        if (isEmpty(taxCodeValue)) {
            setResult(undefined)
            return
        }

        const abortController: AbortController = getAbortController()
        setLoading(true)
        const { body, status } = await VietQRHelper.findTaxCode(taxCodeValue, abortController)
        if (status === 200 && body) {
            setResult(body)
        } else {
            setResult(undefined)
        }
        setLoading(false)

    }, [abort, getAbortController])

    const searchDebounce = useMemo(() => {
        return debounce(handleSearch, 500, { trailing: true })
    }, [handleSearch])

    useEffect(() => {
        searchDebounce(keyword)
    }, [keyword, searchDebounce])

    useEffect(() => {

    }, [])


    return (
        <>
            <input
                className="border w-full px-3 py-1.5 rounded outline-none focus-within:border-indigo-500"
                placeholder="Nhập mã số thuế ...."
                onChange={onChange}
            />

            {
                loading ? (
                    <Loading.Circle className="mx-auto text-white" size={16} />
                ) : result ? (
                    <>
                        {
                            result.code === "00" ? (
                                <div className="space-y-2">
                                    <div className="space-y-1">
                                        <span className="text-gray-500 font-medium">Tên</span>
                                        <p className="capitalize">{result.data?.name.toLowerCase()}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-gray-500 font-medium">Địa chỉ</span>
                                        <p >{result.data?.address}</p>
                                    </div>
                                </div>
                            ) : (
                                <NoResult message="Không tìm thấy doanh nghiệp tương ứng" />
                            )
                        }
                    </>
                ) : null
            }
        </>
    )
}

export default TaxCodeLookup