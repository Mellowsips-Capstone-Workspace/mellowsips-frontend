import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { format, parseISO } from "date-fns"
import { isEmpty } from "lodash"
import { FC } from "react"
import { type Review } from "types/store"

type ReviewProps = {
    review: Review
}

const getRandomImageByPhone = (phone: string) => {
    return (phone.split("").map(parseInt).filter(item => item).reduce((accumulator, current) => accumulator + current, 0) % 14) + 1
}

const Review: FC<ReviewProps> = ({ review }) => {
    return (
        <div className="p-2 rounded border flex space-x-2">
            <div className="h-12 w-12 flex-none border rounded-full overflow-hidden">
                <img
                    className="block h-full w-full"
                    src={`/images/avatar-${getRandomImageByPhone(review.createdBy)}.png`}
                />
            </div>
            <div className="grow">
                <p className="font-medium">{review.createdBy}</p>
                <div className="w-fit flex space-x-1">
                    {
                        Array(5).fill(review.point).map(
                            (point, index) => (index + 1) <= point ? <StarFilledIcon key={index} className="text-main-primary" /> : <StarIcon key={index} className="text-main-primary" />
                        )
                    }
                </div>
                {
                    isEmpty(review.comment) ? null : (
                        <p className="text-sm py-1">{review.comment}</p>
                    )
                }
                <p className="text-xs text-gray-500">{format(parseISO(review.updatedAt), 'HH:mm:ss dd-MM-yyyy')}</p>
            </div>
        </div>
    )
}

export default Review