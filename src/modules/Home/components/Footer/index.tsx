import React from "react";

import Logo from "modules/Common/Logo";
import "./style.css";

const Footer: React.FC = () => {
    return (
        <div>
            <div className="footer-register">
                <div className="max-w-7xl mx-auto py-10">
                    <div className="w-fit mx-auto xl:w-full xl:mx-0 h-fit lg:h-96 space-y-10">
                        <h3 className="text-main-primary text-xl xl:text-3xl text-center xl:w-1/2 font-extrabold">
                            GIẢI PHÁP TIẾT KIỆM <br />THỜI GIAN CHO CỬA HÀNG
                        </h3>
                        <div className="xl:w-1/2 w-full">
                            <button className="block mx-auto px-4 py-2 font-bold rounded bg-main-primary text-white">
                                ĐĂNG KÝ NGAY
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-main-secondary text-white">
                <div className="p-5 max-w-7xl mx-auto space-y-5">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                        <div className="xl:col-span-1 space-y-3">
                            <div className="w-fit">

                                <Logo logoSize={32} showName={true} />
                            </div>

                            <p><b>Công ty TNHH Mellow Sips Việt Nam</b></p>
                            <p><b>Trụ sở chính: </b>Đại học FPT TP.HCM</p>
                            <p><b>Hotline: </b>19001234</p>
                            <div className="social py-5">
                                <span className="text-main-primary d-inline-block me-5">
                                    <i className="fab fa-facebook-f fa-lg"></i>
                                </span>
                                <span className="text-main-primary d-inline-block me-5">
                                    <i className="fab fa-instagram fa-lg"></i>
                                </span>
                                <span className="text-main-primary d-inline-block">
                                    <i className="fab fa-tiktok fa-lg"></i>
                                </span>
                            </div>
                        </div>
                        <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2">
                            <div className="col-span-1 space-y-3">
                                <p><b>Công ty</b></p>
                                <p>Về chúng tôi</p>
                                <p>Dịch vụ</p>
                                <p>Blog</p>
                                <p>Công nghệ</p>
                                <p>Đối tác</p>
                            </div>
                            <div className="col-span-1 space-y-3">
                                <p><b>Chính sách</b></p>
                                <p>Điều khoản sử dụng</p>
                                <p>Chính sách bảo mật</p>
                                <div className="w-full flex flex-wrap gap-5 items-center">
                                    <button className="w-fit flex-none border space-x-2 px-5 py-2">
                                        <i className="fab fa-apple"></i>
                                        <span>Tải ứng dụng trên iOS</span>
                                    </button>
                                    <button className="w-fit flex-none border space-x-2 px-5 py-2">
                                        <i className="fab fa-android"></i>
                                        <span>Tải ứng dụng trên Android</span>

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="">@{new Date().getFullYear()} Mellow Sips Vietnam</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;