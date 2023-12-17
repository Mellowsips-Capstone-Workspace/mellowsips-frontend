import useBoolean from "hooks/useBoolean"
import BankInformation from "modules/Admin/components/VerifyInformation/BankInformation"
import TaxCodeLookup from "modules/Admin/components/VerifyInformation/TaxCodeLookup"
import Tab from "modules/Common/Tab"
import { useState } from "react"

const VerifyInformation = () => {
    const [display, setDisplay] = useBoolean(false)
    const [tab, setTab] = useState("TAX_CODE")

    return (
        <>
            {
                display ? (
                    <div
                        className="fixed right-10 bottom-10 min-h-96 w-110 border bg-white rounded shadow"
                    >
                        <div className="p-2 border-b flex justify-between">
                            <h2 className="font-medium">Hỗ trợ tra cứu thông tin</h2>
                            <button
                                type="button"
                                onClick={setDisplay.off}
                                className="block h-6 w-6 text-slate-400 hover:text-white hover:bg-red-500 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-2 space-y-5">
                            <div className="my-2 p-1 w-fit  mx-auto border rounded bg-slate-100">
                                <Tab.Container
                                    defaultValue="TAX_CODE"
                                    className="flex justify-center space-x-1"
                                    onTabChange={setTab}
                                >
                                    <Tab.Item
                                        displayValue="Mã số thuế"
                                        value="TAX_CODE"
                                        className="px-2 py-1 rounded flex-none flex space-x-1 cursor-pointer aria-checked:bg-main-primary aria-checked:text-white transition-all duration-300"
                                    />
                                    <Tab.Item
                                        displayValue="Ngân hàng"
                                        value="BANK"
                                        className="px-2 py-1 rounded flex-none flex space-x-1 cursor-pointer aria-checked:bg-main-primary aria-checked:text-white transition-all duration-300"
                                    />

                                </Tab.Container>
                            </div>

                            {tab === "BANK" ? <BankInformation /> : null}
                            {tab === "TAX_CODE" ? <TaxCodeLookup /> : null}
                        </div>
                    </div>
                ) : (
                    <div className="fixed right-10 bottom-10">
                        <button
                            onClick={setDisplay.on}
                            className="block h-12 w-12 p-2 rounded-full border bg-slate-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                                <path fill="#F7F9F8" d="M2.306 5.902v8.314c0 .61.494 1.103 1.103 1.103h13.134c.61 0 1.103-.494 1.103-1.103V5.902H2.306Z"></path><path fill="#E2E2E2" d="M7.962 15.321h8.58c.61 0 1.104-.494 1.104-1.103V9.449c-1.667 1.825-5.093 4.95-9.684 5.872Z"></path>
                                <path fill="#98F9F2" d="M12.978 16.038a2.31 2.31 0 1 0 0-4.62 2.31 2.31 0 0 0 0 4.62Z"></path>
                                <path fill="#947BFF" d="M17.175 2.934H3.168l-.71.456v2.487h15.188V3.365l-.47-.431Z"></path>
                                <path fill="#7B5CFF" d="M17.647 5.877V3.365l-.472-.431h-2.227c-.628 1.065-2.01 2.496-4.98 2.943h7.679Z"></path>
                                <path fill="#56D1C5" d="M15.288 13.726c0-.449-.129-.868-.35-1.222-.126.658-.762 2.657-3.81 2.606a2.31 2.31 0 0 0 4.159-1.384Z"></path>
                                <path fill="currentColor" d="M18.534 1H1.466C.658 1 0 1.658 0 2.466v13.317c0 .809.658 1.466 1.466 1.466h7.328a.375.375 0 0 0 0-.75H1.466a.717.717 0 0 1-.716-.716V5.517h18.5v10.266a.717.717 0 0 1-.716.716.375.375 0 1 0 0 .75c.808 0 1.466-.657 1.466-1.466V2.466C20 1.658 19.342 1 18.534 1ZM.75 4.766v-2.3c0-.394.322-.716.716-.716h17.068c.395 0 .716.322.716.716v2.3H.75Z"></path>
                                <path fill="currentColor" d="M17.375 2.836H8.941a.375.375 0 1 0 0 .75h8.434a.375.375 0 0 0 0-.75Zm-14.404.232a.405.405 0 0 0-.082-.122.37.37 0 0 0-.191-.103.383.383 0 0 0-.282.056.368.368 0 0 0-.16.239.366.366 0 0 0 .056.281.395.395 0 0 0 .169.138.39.39 0 0 0 .143.03.376.376 0 0 0 .347-.52Zm1.586 0a.37.37 0 0 0-.273-.225.38.38 0 0 0-.339.103.43.43 0 0 0-.08.122.375.375 0 1 0 .692 0Zm1.527 0a.405.405 0 0 0-.08-.123.378.378 0 0 0-.613.122.378.378 0 0 0 0 .288.365.365 0 0 0 .138.168.365.365 0 0 0 .208.063.378.378 0 0 0 .376-.375.406.406 0 0 0-.029-.144ZM16.42 17.09a3.43 3.43 0 0 0 .762-2.165c0-.923-.36-1.792-1.013-2.445s-1.521-1.012-2.445-1.012-1.791.36-2.444 1.012a3.461 3.461 0 0 0 0 4.89 3.435 3.435 0 0 0 2.444 1.012c.798 0 1.553-.268 2.165-.761l1.804 1.803a.374.374 0 0 0 .53 0 .375.375 0 0 0 0-.53L16.42 17.09Zm-4.61-.25a2.71 2.71 0 0 1 0-3.83 2.69 2.69 0 0 1 1.914-.792 2.69 2.69 0 0 1 1.914.793 2.69 2.69 0 0 1 .793 1.914 2.69 2.69 0 0 1-.793 1.914 2.69 2.69 0 0 1-1.914.793 2.69 2.69 0 0 1-1.914-.793ZM3.135 8.18H2.74a.375.375 0 1 0 0 .75h.395a.375.375 0 0 0 0-.75Zm5.6 0H5.21a.375.375 0 1 0 0 .75h3.524a.375.375 0 0 0 0-.75Zm-5.6 2.222H2.74a.375.375 0 0 0 0 .75h.395a.375.375 0 0 0 0-.75Zm5.6 0H5.21a.375.375 0 0 0 0 .75h3.524a.375.375 0 0 0 0-.75Zm-5.6 2.223H2.74a.375.375 0 0 0 0 .75h.395a.375.375 0 0 0 0-.75Zm5.6 0H5.21a.375.375 0 0 0 0 .75h3.524a.375.375 0 0 0 0-.75Z"></path>
                            </svg>
                        </button>
                    </div>
                )
            }
        </>
    )
}

export default VerifyInformation