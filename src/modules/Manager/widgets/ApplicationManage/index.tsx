import { isEmpty } from "lodash"
import { Widget } from "modules/Layout/Dashboard"
import Applications from "modules/Manager/components/Applications"
import { Link } from "react-router-dom"
import { useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "shadcn/ui/dropdown-menu"

{/* <DropdownMenu>
    <DropdownMenuTrigger
        className="flex-none bg-main-primary text-white px-5 py-2 rounded outline-none"
    >
        Tạo đơn
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mẫu đơn</DropdownMenuLabel>
        <DropdownMenuItem>
            <Link
                to="create"
                className="hover:text-primary cursor-pointer"
            >
                Đăng ký doanh nghiệp
            </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
            <Link
                to=""
                className="hover:text-primary cursor-pointer"

            >
                Yêu cầu cập nhật thông tin
            </Link>
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu> */}
const ApplicationManage = () => {
    const { partnerId } = useAppSelector<Principle>(state => state.authenticate.principle!)
    const pending = isEmpty(partnerId)
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
                        ) : (
                            <Link
                                to="create?ref=update"
                                className="flex-none bg-main-primary text-white px-5 py-2 rounded outline-none"
                            >
                                Yêu cầu cập nhật thông tin
                            </Link>
                        )
                    }
                </div>
            </div>
            <Applications />
        </Widget>
    )
}

export default ApplicationManage