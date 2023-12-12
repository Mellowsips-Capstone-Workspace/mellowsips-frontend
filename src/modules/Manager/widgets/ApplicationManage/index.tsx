import { isEmpty } from "lodash"
import { Widget } from "modules/Layout/Dashboard"
import Applications from "modules/Manager/components/Applications"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PartnerService from "services/PartnerService"
import { useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"

const ApplicationManage = () => {
    const { partnerId } = useAppSelector<Principle>(state => state.authenticate.principle!)
    const pending = isEmpty(partnerId)
    const [isEnterprise, setIsEnterprise] = useState(false)

    useEffect(() => {
        (
            async () => {
                const { status, body } = await PartnerService.getById(partnerId!)
                if (status !== 200 || isEmpty(body) || body.data.type !== "ENTERPRISE") {
                    return
                }
                setIsEnterprise(true)
            }
        )()
    }, [partnerId])

    return (
        <Widget className="space-y-5">
            <div className="bg-white rounded px-5 py-2 space-y-2 shadow">
                <div className="flex items-center justify-between">
                    <div className="grow space-y-1">
                        <h2 className="text-xl font-semibold">Quản lý đơn</h2>
                        <p className="hidden sm:block">Bao gồm các đơn của bạn trên hệ thống Mellow Sips.</p>
                    </div>
                    {
                        pending ? (
                            <Link
                                to="create"
                                className="flex-none bg-main-primary text-white px-5 py-2 rounded outline-none"
                            >
                                Đăng ký doanh nghiệp
                            </Link>
                        ) : isEnterprise ? (
                            <Link
                                to="add-store"
                                className="flex-none bg-main-primary text-white px-5 py-2 rounded outline-none"
                            >
                                Đăng ký thêm cửa hàng
                            </Link>
                        ) : null
                    }
                </div>
            </div>
            <Applications />
        </Widget>
    )
}

export default ApplicationManage