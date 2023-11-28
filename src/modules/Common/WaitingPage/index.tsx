import { isEmpty } from "lodash";
import Loading from "modules/Common/Loading";
import { Widget } from "modules/Layout/Dashboard";
import { FC } from "react";

export const Waiting: FC = () => {
    return (
        <div className="min-h-dynamic-screen grid place-content-center">
            <Loading.Circle className="mx-auto text-main-primary" />
        </div>
    )
}

export const WidgetLoading: FC<{ message?: string }> = ({ message }) => {
    return (
        <Widget className="py-10">
            <Loading.Circle className="mx-auto text-main-primary" />
            {
                isEmpty(message) ? null : (
                    <p className="text-gray-500 text-center">{message}</p>
                )
            }
        </Widget>
    )
}

const WaitingPage: FC = () => {
    return (
        <div className="min-h-dynamic-screen grid place-content-center">
            <div className="space-y-4">
                <Loading.Circle className="mx-auto text-main-primary" />
                <p className="text-gray-500 text-center">Đang tải dữ liệu. Vui lòng đợi trong giây lát!</p>
            </div>
        </div>
    )
}

export default WaitingPage