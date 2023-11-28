
const ProcessSteps: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto p-5 space-y-24">
            <h3 className="text-center font-extrabold text-main-secondary text-3xl">
                QUY TRÌNH ĐĂNG KÝ TRỞ THÀNH ĐỐI TÁC VỚI MELLOW SIPS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                <div className="flex">
                    <img loading="lazy" className="flex-none" src="/images/process-step-1.svg" alt="Step 1" />
                    <div className="grow px-3">
                        <p className="text-main-primary font-bold">Bước 1</p>
                        <p className="text-main-secondary font-semibold">
                            Đăng ký tài khoản Mellow Sips tại{" "}
                            <span className="text-main-primary clickable">đây</span>
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <img loading="lazy" className="flex-none" src="/images/process-step-2.svg" alt="Step 2" />
                    <div className="grow px-3">
                        <p className="text-main-primary font-bold">Bước 2</p>
                        <p className="text-main-secondary font-semibold">
                            Cung cấp thông tin chi tiết của nhà hàng
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <img loading="lazy" className="flex-none" src="/images/process-step-3.svg" alt="Step 3" />
                    <div className="grow px-3">
                        <p className="text-main-primary font-bold">Bước 3</p>
                        <p className="text-main-secondary font-semibold">
                            Nhận tư vấn từ nhân viên Mellow Sips
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <img loading="lazy" className="flex-none" src="/images/process-step-4.svg" alt="Step 4" />
                    <div className="grow px-3">
                        <p className="text-main-primary font-bold">Bước 4</p>
                        <p className="text-main-secondary font-semibold">
                            Hoàn tất thanh toán phí kích hoạt cửa hàng và ký hợp đồng
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <img loading="lazy" className="flex-none" src="/images/process-step-5.svg" alt="Step 5" />
                    <div className="grow px-3">
                        <p className="text-main-primary font-bold">Bước 5</p>
                        <p className="text-main-secondary font-semibold">
                            Đăng nhập và sử dụng hệ thống quản lý của Mellow Sips
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessSteps;
