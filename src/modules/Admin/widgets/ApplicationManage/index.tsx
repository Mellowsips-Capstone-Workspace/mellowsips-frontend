import Applications from "modules/Admin/components/Applications"
import { Widget } from "modules/Layout/Dashboard"

const ApplicationManage = () => {
    return (
        <Widget className="space-y-5">
            <div className="bg-white rounded px-5 py-2 space-y-2 shadow">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Quản lý đơn</h2>
                    <p>Bao gồm các đơn trên hệ thống Mellow Sips.</p>
                </div>
            </div>
            <Applications />
        </Widget>
    )
}

export default ApplicationManage