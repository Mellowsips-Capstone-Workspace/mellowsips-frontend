import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import useBoolean from "hooks/useBoolean"
import useMediaQuery from "hooks/useMediaQuery"
import LogoFull from "modules/Common/LogoFull"
import Modal from "modules/Common/Modal/Modal"
import showToast from "modules/Common/Toast"
import Sidebar from "modules/Layout/Dashboard/components/Sidebar"
import Notification from "modules/Notification"
import Profile from "modules/Profile"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import StompClientService from "services/StompClientService"
import { Avatar, AvatarImage } from "shadcn/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "shadcn/ui/dropdown-menu"
import { clearPrinciple } from "stores/authenticate"
import { useAppDispatch, useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"

const MobileMenu: FC = () => {
    const [display, setDisplay] = useBoolean(false)
    const principle = useAppSelector<Principle>(state => state.authenticate.principle!)

    return (
        <>
            <button
                type="button"
                className="outline-none"
                onClick={display ? undefined : setDisplay.on}
            >
                <HamburgerMenuIcon className="h-5 w-5 hover:text-primary" />
            </button>
            <Modal
                flag={display}
                closeModal={setDisplay.off}
                closeOutside={true}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50"
                innerClassName="w-fit h-full"

            >
                <div className="h-14 w-72 bg-white shadow border-b">
                    <div className=" px-5 py-1 w-fit group flex space-x-2  items-center font-semibold cursor-pointer" >
                        <Avatar
                            className="h-9 w-9"
                        >
                            <AvatarImage src={principle.avatar} />
                            <img
                                alt="fallback"
                                className="h-full aspect-square"
                                src="/images/avatar-fallback.png"
                            />
                        </Avatar>
                        <div className="space-y-0">
                            <p className="text-sm group-hover:text-main-primary transition-colors">{principle.displayName}</p>

                            <span className="capitalize text-xs">{principle.type.toLowerCase()}</span>
                        </div>
                    </div>
                </div>
                <Sidebar onSidebarClick={setDisplay.off} />
            </Modal>
        </>
    )
}


const Header: FC = () => {
    const principle = useAppSelector<Principle>(state => state.authenticate.principle!)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const mobileScreen = useMediaQuery("(max-width: 640px)")

    const handleLogout = () => {
        showToast(
            {
                type: "success",
                title: "Thành công",
                message: "Đang xuất thành công."
            }
        )
        StompClientService.disconnect()
        dispatch(clearPrinciple())
        navigate("/")
    }

    return (
        <header
            className="bg-white h-14 px-5 flex items-center justify-between border-b"
        >
            <div className="flex-none">
                <LogoFull height={24} />
            </div>
            <div className="space-x-4 flex items-center">
                <Profile />
                <Notification />
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="outline-none w-fit group flex space-x-1 items-center font-semibold cursor-pointer"
                    >
                        <Avatar
                            className="h-8 w-8"
                        >
                            <AvatarImage src={principle.avatar} />
                            <img
                                alt="fallback"
                                className="h-full aspect-square"
                                src="/images/avatar-fallback.png"
                            />
                        </Avatar>

                        <span className="hidden sm:inline group-hover:text-main-primary transition-colors">{principle.displayName}</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="mt-2">
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="cursor-pointer"
                        >
                            Đăng Xuất
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {
                    mobileScreen ? (
                        <MobileMenu />
                    ) : null
                }
            </div>
        </header>
    )
}

export default Header