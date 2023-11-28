
const ImportantNotice: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto p-5 space-y-24 home-page-notice">
            <h3 className="text-main-secondary text-center font-bold text-3xl">
                CÁC TÀI LIỆU QUAN TRỌNG CẦN CHUẨN BỊ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                <div className="app-sample">
                    <img loading="lazy" src="/images/app-sample.svg" alt="App sample" />
                </div>
                <div className="space-y-10 text-main-secondary">
                    <div className="flex-1 d-flex flex-column justify-content-center">
                        <div className="notice-section p-4">
                            <p className="text-xl font-bold">Cá nhân</p>
                            <ul className="list-disc px-5">
                                <li>Hình ảnh 2 mặt CMND/CCCD/Hộ chiếu</li>
                                <li>Hình ảnh mặt tiền cửa hàng</li>
                                <li>Hình ảnh thực đơn</li>
                                <li>Hình ảnh chứng minh tài khoản ngân hàng</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 d-flex flex-column justify-content-center">
                        <div className="notice-section p-4">
                            <p className="text-xl font-bold">Công ty</p>
                            <ul className="list-disc px-5">
                                <li>Hình ảnh giấy chứng nhận đăng ký công ty</li>
                                <li>
                                    Hình ảnh giấy chứng nhận đăng ký địa điểm kinh doanh mỗi chi
                                    nhánh
                                </li>
                                <li>Hình ảnh mặt tiền cửa hàng</li>
                                <li>Hình ảnh thực đơn</li>
                                <li>Hình ảnh chứng minh tài khoản ngân hàng</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 d-flex flex-column justify-content-center">
                        <div className="notice-section p-4">
                            <p className="text-xl font-bold">Hộ kinh doanh</p>
                            <ul className="list-disc px-5">
                                <li>Hình ảnh giấy chứng nhận đăng ký hộ kinh doanh</li>
                                <li>Hình ảnh mặt tiền cửa hàng</li>
                                <li>Hình ảnh thực đơn</li>
                                <li>Hình ảnh chứng minh tài khoản ngân hàng</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportantNotice;
