const ReasonSection: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto p-5 space-y-24">
            <h3 className="text-main-secondary font-extrabold text-center text-3xl">
                TẠI SAO LẠI CHỌN MELLOW SIPS?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="space-y-2">
                    <img loading="lazy" className="block w-full aspect-square object-cover" src="/images/reason-1.svg" alt="Reason 1" />

                    <p className="text-main-secondary text-center font-bold">
                        Hệ thống thẻ rung điện tử ngay trên điện thoại thông minh của khách
                        hàng
                    </p>
                </div>
                <div className="space-y-2">
                    <img loading="lazy" className="block w-full aspect-square object-cover" src="/images/reason-2.svg" alt="Reason 2" />
                    <p className="text-main-secondary text-center font-bold">
                        Đơn hàng tăng cao, thanh toán trực tuyến
                    </p>
                </div>
                <div className="space-y-2">
                    <img loading="lazy" className="block w-full aspect-square object-cover" src="/images/reason-3.svg" alt="Reason 3" />

                    <p className="text-main-secondary text-center font-bold">
                        Kết nối với khách hàng dễ dàng hơn bao giờ hết
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReasonSection;
