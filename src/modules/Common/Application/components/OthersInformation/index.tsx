import BankHelper from 'helpers/bank';
import { isEmpty } from 'lodash';
import FormikTextField from 'modules/Common/FormikTextField';
import { FC, useEffect, useState } from 'react';

const OthersInformation: FC = () => {
    const [bankList, setBankList] = useState<string[]>([]);

    useEffect(() => {
        (
            async () => {
                const response = await BankHelper.getBankList()

                if (response.error) {
                    return
                }

                const { body } = response
                if (!isEmpty(body) && body.code === "00" && Array.isArray(body.data)) {
                    setBankList(
                        body.data.map(bank => `${bank.shortName} - ${bank.name}`)
                    )
                }
            }
        )()
    }, [])

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-main-primary text-xl font-semibold py-2">Thông tin người đối soát hóa đơn (nếu có)</h2>
                <div className="space-y-5 pt-3">
                    <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                        <FormikTextField.Label label="Họ và tên" />
                        <FormikTextField.Input name="controller.name" placeholder="Họ và tên" />
                    </div>
                    <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                        <FormikTextField.Label label="Số điện thoại" />
                        <FormikTextField.PhoneInput
                            startWith="84"
                            placeholder="84"
                            name="controller.phone"
                        />
                    </div>
                    <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                        <FormikTextField.Label label="Email" />
                        <FormikTextField.Input name="controller.email" placeholder="Email" />
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-main-primary text-xl font-semibold py-2">Thông tin tài khoản ngân hàng</h2>
                <div className="space-y-5 pt-3">
                    <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                        <FormikTextField.Label label="Tên ngân hàng" required={true} />
                        <FormikTextField.AutocompleteInput
                            name="bankAccount.bankName"
                            placeholder="Tên ngân hàng"
                            options={bankList}
                            acceptedInOptions={true}
                            errorMessage="Ngân hàng không hợp lệ."
                            sensitive={true}
                        />
                    </div>
                    <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                        <FormikTextField.Label label="Chi nhánh" required={true} />
                        <FormikTextField.Input name="bankAccount.bankBranch" placeholder="Chi nhánh" />
                    </div>
                    <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                        <FormikTextField.Label label="Họ và tên chủ tài khoản" required={true} />
                        <FormikTextField.Input name="bankAccount.accountName" placeholder="Họ và tên chủ tài khoản" />
                    </div>
                    <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                        <FormikTextField.Label label="Số tài khoản" required={true} />
                        <FormikTextField.Input
                            name="bankAccount.accountNumber"
                            placeholder="Số tài khoản"
                        />
                    </div>
                    <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                        <FormikTextField.Label label="Hình ảnh Chứng từ giao dịch/ Ủy nhiệm chi/ Biên lai chuyển tiền"
                            required={true} />
                        <FormikTextField.UploadFile
                            multiple={true}
                            accept="image/*"
                            name="bankAccount.identityImages"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OthersInformation