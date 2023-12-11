import { APPLICATION_STATUS, ORGANIZATION } from 'enums/application'
import { baseBadge } from 'modules/Common/Badge'
import { FC } from 'react'

type TypeProps = {
    type: string
}

const Type: FC<TypeProps> = ({ type }) => {
    return (
        <>
            {
                type === "CREATE_ORGANIZATION" ? (
                    <div className={baseBadge({ intent: "blue", className: "h-fit w-fit py-0.5 px-1.5 mx-auto text-xs" })}>
                        Tạo doanh nghiệp
                    </div>
                ) : null
            }
        </>
    )
}

type BusinessProps = {
    type: string
}

export const Business: FC<BusinessProps> = ({ type }) => {
    return (
        <>
            {
                type === ORGANIZATION.PERSONAL ? (
                    <div className={baseBadge({ intent: "blue", className: "h-fit w-fit flex space-x-1 py-0.5 px-1.5 mx-auto text-xs" })}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                        <span>Cá nhân</span>
                    </div>
                ) : null
            }
            {
                type === ORGANIZATION.HOUSEHOLD ? (
                    <div className={baseBadge({ intent: "green", className: "h-fit w-fit flex space-x-1 py-0.5 px-1.5 mx-auto text-xs" })}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                            <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
                        </svg>

                        <span>Hộ kinh doanh</span>
                    </div>
                ) : null
            }
            {
                type === ORGANIZATION.ENTERPRISE ? (
                    <div className={baseBadge({ intent: "green", className: "h-fit w-fit flex space-x-1 py-0.5 px-1.5 mx-auto text-xs" })}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                            <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                        </svg>
                        <span>Công ty</span>
                    </div>
                ) : null
            }
        </>
    )
}

type StatusProps = {
    status: string
}

const Status: FC<StatusProps> = ({ status }) => {
    return (
        <>
            {
                status === APPLICATION_STATUS.WAITING ? (
                    <div className={baseBadge({ intent: "gray", className: "h-fit w-fit py-0.5 px-1.5 mx-auto text-xs" })}>
                        Xét duyệt
                    </div>
                ) : status === APPLICATION_STATUS.APPROVED ? (
                    <div className={baseBadge({ intent: "green", className: "h-fit w-fit py-0.5 px-1.5 mx-auto text-xs" })}>
                        Chấp thuận
                    </div>
                ) : status === APPLICATION_STATUS.PROCESSING ? (
                    <div className={baseBadge({ intent: "blue", className: "h-fit w-fit py-0.5 px-1.5 mx-auto text-xs" })}>
                        Đang duyệt
                    </div>
                ) : status === APPLICATION_STATUS.REJECTED ? (
                    <div className={baseBadge({ intent: "red", className: "h-fit w-fit py-0.5 px-1.5 mx-auto text-xs" })}>
                        Từ chối
                    </div>
                ) : status === APPLICATION_STATUS.DRAFT ? (
                    <div className={baseBadge({ intent: "secondary", className: "h-fit w-fit py-0.5 px-1.5 mx-auto text-xs" })}>
                        Lưu nháp
                    </div>
                ) : null
            }
        </>
    )
}

const ApplicationBadge = { Type, Business, Status }
export default ApplicationBadge