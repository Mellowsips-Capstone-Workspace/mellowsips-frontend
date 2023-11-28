import { isEmpty } from "lodash"
import { Label, Value } from "modules/Common/ApplicationData/Row"
import DocumentPreview from "modules/Common/Document"
import { FC } from "react"
import { BankAccountModel, ControllerModel } from "types/application"

type OtherInfoProps = {
    bankAccount: BankAccountModel
    controller: ControllerModel
}

const OtherInfo: FC<OtherInfoProps> = ({ bankAccount, controller }) => {
    return (
        <div className="pb-5 space-y-5">
            {
                isEmpty(controller) ? null : (
                    <>
                        <h2 className="font-semibold text-main-primary">Thông tin người đối soát hóa đơn </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                            <div className="space-y-2">
                                <Label>Họ và tên</Label>
                                <Value>{controller.email}</Value>
                            </div>
                            <div className="space-y-2">
                                <Label>Số điện thoại</Label>
                                <Value>{controller.phone}</Value>
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Value> {controller.email} </Value>
                            </div>
                        </div>
                        <hr></hr>
                    </>
                )
            }

            <h2 className="font-semibold text-main-primary">Thông tin tài khoản ngân hàng</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="space-y-2">
                    <Label>Chủ tài khoản</Label>
                    <Value>{bankAccount.accountName}</Value>
                </div>
                <div className="space-y-2">
                    <Label>Ngân hàng</Label>
                    <Value>{bankAccount.bankName}</Value>
                </div>
                <div className="space-y-2">
                    <Label>Số tài khoản</Label>
                    <Value> {bankAccount.accountNumber} </Value>
                </div>
                <div className="space-y-2">
                    <Label>Chi nhánh</Label>
                    <Value> {bankAccount.bankBranch} </Value>
                </div>
            </div>

            <div className='space-y-2'>
                <Label>Hình ảnh Chứng từ giao dịch/ Ủy nhiệm chi/ Biên lai chuyển tiền</Label>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                    {
                        bankAccount.identityImages.map(documentId => <DocumentPreview key={documentId} documentId={documentId} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default OtherInfo