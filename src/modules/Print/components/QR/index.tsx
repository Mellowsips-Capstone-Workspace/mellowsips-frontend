import { GridIcon } from "@radix-ui/react-icons";
import CryptoLocalStorageHelper from "helpers/storage";
import { isEmpty } from "lodash";
import Button from "modules/Common/Button";
import LogoFull from "modules/Common/LogoFull";
import QRCode from "modules/Common/QRCode";
import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Slider } from "shadcn/ui/slider";

const PrintQR = () => {
    const [prams] = useSearchParams()
    const data = prams.get("data")
    const navigate = useNavigate()

    const [rows, setRows] = useState(4)
    const [columns, setColumns] = useState(10)

    useEffect(() => {
        document.title = "QR Code - Xem trước"
        if (isEmpty(data)) {
            navigate("/", { replace: true })
            return
        }

    }, [data, navigate])

    const handlePrint = useCallback(() => {
        window.print()
    }, [])

    const isValidData = useCallback((data: string | null | undefined) => {
        if (!data || isEmpty(data)) {
            return false
        }

        try {
            CryptoLocalStorageHelper.decodeDataURI(data)

            return true
        } catch {
            return false
        }

    }, [])


    return (
        <div className="p-5 space-y-5">
            <div className="print:hidden w-fit mx-auto">
                <LogoFull height={26} disable={true} />
            </div>

            {
                isValidData(data) ? (
                    <div
                        className="grid gap-1"
                        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
                    >
                        {
                            Array(columns * rows).fill(JSON.parse(CryptoLocalStorageHelper.decodeDataURI(data!))).map(
                                (data, index) => (
                                    <div
                                        key={index}
                                        className="w-full aspect-square border-main-primary border"
                                    >
                                        <QRCode
                                            data={data.code}
                                            showAction={false}
                                        />
                                    </div>
                                )
                            )
                        }
                    </div>
                ) : (
                    <Navigate to="/" replace={true} />
                )
            }

            <div className="w-screen h-fit p-5 bottom-0 left-0 fixed bg-white border print:hidden">
                <div className="flex flex-wrap justify-center items-end gap-x-10 gap-y-5">
                    <div className="w-80 space-y-1">
                        <div className="w-fit flex space-x-1 items-center text-gray-500">
                            <GridIcon />
                            <span className="font-medium">Số lượng cột</span>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <div className="grow">
                                <Slider
                                    defaultValue={[10]}
                                    min={1}
                                    max={10}
                                    step={1}
                                    onValueChange={(values: number[]) => setColumns(values.at(0)!)}
                                />
                            </div>
                            <span className="font-medium">{columns}</span>
                        </div>
                    </div>
                    <div className="w-80 space-y-1">
                        <div className="w-fit flex space-x-1 items-center text-gray-500">
                            <GridIcon />
                            <span className="font-medium">Số lượng hàng</span>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <div className="grow">
                                <Slider
                                    defaultValue={[4]}
                                    min={1}
                                    max={14}
                                    step={1}
                                    onValueChange={(values: number[]) => setRows(values.at(0)!)}
                                />
                            </div>
                            <span className="font-medium">{rows}</span>
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="primary"
                        className="w-40 space-x-2"
                        onClick={handlePrint}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                        </svg>
                        <span>
                            In
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PrintQR