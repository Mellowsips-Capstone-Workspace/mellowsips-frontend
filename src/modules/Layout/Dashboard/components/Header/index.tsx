import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import useBoolean from "hooks/useBoolean"
import useMediaQuery from "hooks/useMediaQuery"
import LogoFull from "modules/Common/LogoFull"
import Modal from "modules/Common/Modal/Modal"
import showToast from "modules/Common/Toast"
import Sidebar from "modules/Layout/Dashboard/components/Sidebar"
import Notification from "modules/Notification"
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
                {
                    mobileScreen ? null : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </>
                    )
                }

                <Notification />

                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="w-fit group flex space-x-1 items-center font-semibold cursor-pointer"
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