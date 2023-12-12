import { useField } from 'formik'
import { FC, MouseEvent, useCallback } from 'react'

type SuggestReasonProps = {
    name: string
}
const SuggestReason: FC<SuggestReasonProps> = ({ name }) => {
    const [, , { setValue }] = useField(name)

    const reasons = [
        "Thông tin cửa hàng chưa hợp lệ. Vui lòng cập nhật lại thông tin.",
        "Thông tin doanh nghiệp chưa hợp lệ. Vui lòng cập nhật lại thông tin.",
        "Thông tin đối soát chưa hợp lệ. Vui lòng cập nhật lại thông tin.",
        "Thông tin thanh toán chưa hợp lệ. Vui lòng cập nhật lại thông tin.",
        "Xin lỗi vì sư bất tiện này hiện tại chúng hệ thống không thể xử lý đơn này.",
    ]

    const handleSelectReason = useCallback((event: MouseEvent<HTMLSpanElement>) => {
        setValue(event.currentTarget.dataset.reason, true)
    }, [setValue])

    return (
        <div className='space-y-1 py-2'>
            <p className='font-medium text-sm text-gray-500'>Chọn nhanh lý do từ chối:</p>
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