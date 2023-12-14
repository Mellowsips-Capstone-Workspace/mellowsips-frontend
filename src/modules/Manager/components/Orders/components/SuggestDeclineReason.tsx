import { useField } from 'formik'
import { FC, MouseEvent, useCallback } from 'react'
import { toCurrency } from 'utils/text'

type SuggestDeclineReasonProps = {
    name: string
    totalPrice: number
}
const SuggestDeclineReason: FC<SuggestDeclineReasonProps> = ({ name, totalPrice }) => {
    const [, , { setValue }] = useField(name)

    const reasons = [
        "Khách hàng boom hàng không rõ lý do.",
        `Chúng tôi bị boom với đơn hàng có tổng trị giá ${toCurrency(totalPrice)}.`,
    ]

    const handleSelectReason = useCallback((event: MouseEvent<HTMLSpanElement>) => {
        setValue(event.currentTarget.dataset.reason, true)
    }, [setValue])

    return (
        <div className='space-y-1 py-2'>
            <p className='font-medium text-sm text-gray-500'>Chọn nhanh:</p>
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

export default SuggestDeclineReason