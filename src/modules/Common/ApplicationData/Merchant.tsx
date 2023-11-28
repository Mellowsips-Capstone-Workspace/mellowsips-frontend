import { Label, Value } from "modules/Common/ApplicationData/Row"
import DocumentPreview from 'modules/Common/Document'
import { FC } from 'react'
import { MerchantModel } from 'types/application'

type MerchantProps = {
    merchants: MerchantModel[]
}

const Merchant: FC<MerchantProps> = ({ merchants }) => {
    return (
        <div className='pb-5 space-y-5'>
            {
                merchants.map(
                    ({ menuImages, name, email, phone, address, merchantImages }, index, array) => (
                        <div
                            key={index}
                            className='space-y-5 last:border-b-0 border-b'
                        >
                            <h2 className='text-main-primary font-medium text-lg'>Cửa hàng {array.length > 1 ? ++index : null}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                                <div className="space-y-2">
                                    <Label>Tên cửa hàng</Label>
                                    <Value>{name}</Value>
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Value>{email}</Value>
                                </div>
                                <div className="space-y-2">
                                    <Label>Số điện thoại</Label>
                                    <Value>{phone}</Value>
                                </div>
                                <div className="space-y-2">
                                    <Label>Địa chỉ</Label>
                                    <Value>{address}</Value>
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label>Hình ảnh quán</Label>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                    {
                                        merchantImages.map(documentId => <DocumentPreview key={documentId} documentId={documentId} />)
                                    }
                                </div>
                            </div>
                            <div data-i={array.length - 1} className='space-y-2'>
                                <Label>Hình ảnh thực đơn</Label>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                    {
                                        menuImages.map(documentId => <DocumentPreview key={documentId} documentId={documentId} />)
                                    }
                                </div>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Merchant