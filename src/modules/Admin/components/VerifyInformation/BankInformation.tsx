import { Form, Formik } from "formik";
import VietQRHelper from "helpers/vietQR";
import { isEmpty } from "lodash";
import Button from "modules/Common/Button";
import FormikTextField from "modules/Common/FormikTextField";
import { useEffect, useState } from "react";

const BankInformation = () => {
    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(true)
    const [bankList, setBankList] = useState<{ label: string, value: string }[]>([])

    useEffect(() => {
        (
            async () => {
                const response = await VietQRHelper.getBankList()

                if (response.error) {
                    setLoading(false)
                    return
                }

                const { body } = response
                if (!isEmpty(body) && body.code === "00" && Array.isArray(body.data)) {
                    setBankList(body.data.map(({ bin, name, shortName }) => ({ value: bin, label: `${shortName} - ${name}` })))
                }
                setLoading(false)
            }
        )()
    }, [])

    return (
        <div className="px-2 space-y-4">
            {
                loading ? null : (
                    <Formik
                        initialValues={
                            {
                                bin: "970416",
                                accountNumber: ""
                            }
                        }

                        onSubmit={
                            async ({ bin, accountNumber }) => {
                                if (isEmpty(accountNumber)) {
                                    setResult("")
                                    return
                                }
                                setResult("Đang tra cứu ...")
                                const { status, body } = await VietQRHelper.findAccountName({ bin: parseInt(bin), accountNumber })
                                if (status !== 200 || isEmpty(body)) {
                                    setResult("")
                                    return
                                }

                                if (body.code === "00" && body.data) {
                                    setResult(body.data.accountName)
                                    return
                                }
                                setResult("Không tìm thấy kết quả.")
                            }
                        }
                    >
                        <Form className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-gray-500 font-medium">Ngân hàng</label>
                                <FormikTextField.DropdownInput
                                    name="bin"
                                    options={bankList}
                                    placeholder="Chọn ngân hàng"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-gray-500 font-medium">Số tài khoản</label>
                                <FormikTextField.Input
                                    name="accountNumber"
                                    placeholder="Ví dụ: 79447988"
                                />
                            </div>

                            <Button
                                variant="indigo"
                                className="w-full"
                                type="submit"
                            >
                                Kiểm tra số tài khoản
                            </Button>
                        </Form>
                    </Formik>

                )
            }
            <div className="space-y-1">
                <p className="">{result}</p>
                <p className="text-xs italic text-main-primary API">
                    Lưu ý: API này cung cấp bởi <a className="font-bold" target="_blank" href="https://vietqr.io/en/danh-sach-api/api-tra-cuu-so-tai-khoan">VietQR</a> và đang trong giai đoạn thử nghiệm.
                </p>

            </div>
        </div>
    )
}

export default BankInformation