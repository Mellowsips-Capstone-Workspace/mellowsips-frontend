import { FC } from "react";

import useBoolean from "hooks/useBoolean";
import useMediaQuery from "hooks/useMediaQuery";
import Logo from "modules/Common/Logo";
import "modules/Home/components/Header/style.css";
import { Link, useMatch } from "react-router-dom";

const Header: FC = () => {
    const xlScreen = useMediaQuery("(min-width: 1280px)")
    const match = useMatch("")
    const [display, setDisplay] = useBoolean(false)

    return (
        <header className={`py-6 ${match ? "bg-main-secondary" : "bg-white"}`}>
            <div className="max-w-7xl px-5 mx-auto flex justify-between">
                <Logo primary={match ? true : false} logoSize={36} />
                {
                    xlScreen ? (
                        <nav className={`flex space-x-10 items-center transition-colors ${match ? "text-white" : "text-main-secondary"}`}>
                            <Link
                                className="nav-link"
                                to="/faq"
                            >
                                Hỏi đáp
                            </Link>
                            <Link
                                className="nav-link"
                                to="/about-us"
                            >
                                Về chúng tôi
                            </Link>
                            <Link
                                className="nav-link"
                                to="/contact"
                            >
                                Liên hệ
                            </Link>
                            <Link to={"/login"}>
                                <button
                                    className="bg-main-primary text-white rounded-lg px-4 py-3 font-bold"
                                >
                                    Đăng Nhập
                                </button>
                            </Link>
                        </nav>
                    ) : display ? (
                        <div
                            className="fixed z-10 top-0 left-0 w-screen h-screen bg-main-secondary/50"
                            onClick={setDisplay.off}
                        >
                            <div className="border-l border-l-slate-600 ml-auto w-80 h-full bg-main-secondary text-white space-y-2">
                                <Link to="/faq" className="block px-2 py-2 hover:text-main-primary transition-colors">Hỏi đáp</Link>
                                <Link to="/about-us" className="block px-2 py-2 hover:text-main-primary transition-colors">Về chúng tôi</Link>
                                <Link to="/contact" className="block px-2 py-2 hover:text-main-primary transition-colors">Liên hệ</Link>
                                <Link to="/register" className="block px-2 py-2 text-white transition-colors">
                                    <button
                                        className="w-full px-4 py-3 font-bold bg-main-primary rounded"
                                    >
                                        Trở Thành Đối Tác
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <button
                            className={`bg-transparent border-0 ${match ? "text-white" : "text-main-secondary"}`}
                            onClick={setDisplay.on}
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={32}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    )
                }
            </div>
        </header >
    )
}

export default Header;