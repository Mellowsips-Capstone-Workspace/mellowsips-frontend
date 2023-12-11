import { Widget } from 'modules/Layout/Dashboard'
import CustomerFeedback from 'modules/Manager/components/Feedback'
import { FC } from 'react'

const Review: FC = () => {
    return (
        <Widget className="space-y-5">
            <div className="bg-white rounded px-5 py-2 space-y-2 shadow">
                <h2 className="text-xl font-semibold">Đánh giá từ khách hàng</h2>
                <p className="hidden sm:block">Bao gồm các đánh giá của khách hàng về dịch vụ của bạn.</p>
            </div>
            <CustomerFeedback />
        </Widget>
    )
}

export default Review