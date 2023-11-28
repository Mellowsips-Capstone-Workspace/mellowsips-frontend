import { CubeIcon, FileTextIcon, HomeIcon, PersonIcon, StackIcon } from "@radix-ui/react-icons"
import ROLE from "enums/role"
import { isEmpty, isNull } from "lodash"
import { FC, ReactNode } from "react"
import { Link, useMatch } from "react-router-dom"
import { useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"

type SidebarItemProps = {
    disable: boolean
    path: string
    pattern: string
    label: string
    icon: ReactNode
    onSidebarClick?: () => void

}

const SidebarItem: FC<SidebarItemProps> = ({ path, label, pattern, disable, icon, onSidebarClick }) => {
    const active = !isNull(useMatch(pattern))

    return (
        <li
            className="w-full"
            onClick={onSidebarClick}
        >
            <Link
                to={path}
                className="sidebar-item"
                data-active={active}
                aria-disabled={disable}
            >
                <span className="h-6 w-6 p-0.5">
                    {icon}

                </span>
                <span className="font-medium">{label}</span>
            </Link>
        </li>
    )

}

type SidebarProps = {
    onSidebarClick?: () => void
}
const Sidebar: FC<SidebarProps> = ({ onSidebarClick }) => {
    const { type, partnerId } = useAppSelector<Principle>(state => state.authenticate.principle!)
    const pending = isEmpty(partnerId)

    const navigates = type === ROLE.ADMIN ? [
        {
            disable: false,
            path: "applications",
            label: "Quản lý đơn",
            pattern: "/applications/*",
            icon: <FileTextIcon className="h-full w-full" />
        }
    ] : [
        {
            disable: false,
            path: "dashboard",
            label: "Tổng quan",
            pattern: "/dashboard/*",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
            )
        },
        {
            disable: false,
            path: "applications",
            label: "Quản lý đơn",
            pattern: "/applications/*",
            icon: <FileTextIcon className="h-full w-full" />
        },
        {
            disable: false,
            path: "qr",
            label: "Mã QR",
            pattern: "/qr/*",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                </svg>
            )
        },
        {
            disable: false,
            path: "stores",
            label: "Chi nhánh",
            pattern: "/stores/*",
            icon: <HomeIcon className="h-full w-full" />

        },
        {
            disable: false,
            path: "menus",
            label: "Menu",
            pattern: "/menus/*",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            )

        },
        {
            disable: false,
            path: "products",
            label: "Sản phẩm",
            pattern: "/products/*",
            icon: <CubeIcon className="h-full w-full" />
        },
        {
            disable: false,
            path: "orders",
            label: "Đơn hàng",
            pattern: "/orders/*",
            icon: <StackIcon className="h-full w-full" />
        },
        {
            disable: false,
            path: "vouchers",
            label: "Khuyễn mãi",
            pattern: "/vouchers/*",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            )

        },
        {
            disable: false,
            path: "account",
            label: "Nhân viên",
            pattern: "/account/*",
            icon: <PersonIcon className="h-full w-full" />
        }
    ]

    return (
        <div className="w-72 sm:w-56 min-h-full sticky top-0 bg-white">
            <ul className="space-y-1">
                {
                    pending ? (
                        <SidebarItem onSidebarClick={onSidebarClick} {...navigates.find(({ path }) => path.startsWith("applications"))!} />
                    ) : navigates.map(
                        (navigate, index) => <SidebarItem key={index} onSidebarClick={onSidebarClick} {...navigate} />
                    )
                }
            </ul>
        </div>
    )
}

export default Sidebar