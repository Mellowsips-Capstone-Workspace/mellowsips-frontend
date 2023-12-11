import { useField } from 'formik'
import { FC, MouseEvent, useCallback } from 'react'

type SuggestReasonProps = {
    name: string
}
const SuggestReason: FC<SuggestReasonProps> = ({ name }) => {
    const [, , { setValue }] = useField(name)

    const reasons = [
        "Rất tiếc sản phẩm tạm hết. Quý khách vui lòng đặt sản phẩm khác.",
        "Xin lỗi vì sư bất tiện này hiện tại cửa hàng không thể xử lý đơn hàng này.",
        "Thành thật xin lỗi, sản phẩm đã hết hàng trước thời hạn dự kiến. Kính mong sự thông cảm của quý khách.",
    ]

    const handleSelectReason = useCallback((event: MouseEvent<HTMLSpanElement>) => {
        setValue(event.currentTarget.dataset.reason, true)
    }, [setValue])

    return (
        <div className='space-y-1 py-2'>
            <p className='font-medium text-sm text-gray-500'>Đề xuất lý do huỷ:</p>
            {
                reasons.map(
                    (reason, index) => (
                        <p className='w-fit text-xs italic rounded hover:text-main-primary cursor-pointer' data-reason={reason} onClick={handleSelectReason} key={index}>- {reason}</p>
                    )
                )
            }
        </div>
    )
}

export default SuggestReason