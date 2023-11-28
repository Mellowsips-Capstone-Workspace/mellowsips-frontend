
const AboutUsPage = () => {
    return (
        <>
            <section className="max-w-7xl mx-auto px-5 py-10 space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:order-last pointer-events-none select-none">
                        <img className="block sm:w-10/12 md:w-8/12" src="/images/about-us-1.png" alt="about-us" />
                    </div>
                    <div className="space-y-5">
                        <h2 className="text-3xl sm:text-5xl font-bold">TẤT TẦN TẬT VỀ MELLOW SIPS</h2>
                        <p>Mellow Sips là một ứng dụng di động độc đáo dành cho trải nghiệm ẩm thực, với tính năng đặc biệt thay thế thẻ rung bằng ứng dụng di động, mang đến sự tiện lợi và trải nghiệm mới mẻ cho người dùng. Dưới đây là tóm tắt về Mellow Sips, tầm nhìn, sứ mệnh, mục tiêu và tính năng thay thế thẻ rung.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="pointer-events-none select-none">
                        <img className="block sm:w-10/12 md:w-8/12" src="/images/about-us-2.png" alt="about-us" />
                    </div>
                    <div className="space-y-5">
                        <h2 className="text-3xl sm:text-5xl font-bold">TẦM NHÌN</h2>
                        <p>Tầm nhìn của Mellow Sips là trở thành ứng dụng ẩm thực hàng đầu, được ưa chuộng và tin dùng tại các thành phố và khu vực phát triển nhanh chóng. Ứng dụng hướng đến việc tạo nên sự kết nối đáng tin cậy giữa người dùng và nhà hàng thông qua trải nghiệm ẩm thực đa dạng và chất lượng.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:order-last pointer-events-none select-none">
                        <img className="block sm:w-10/12 md:w-8/12" src="/images/about-us-3.png" alt="about-us" />
                    </div>
                    <div className="space-y-5">
                        <h2 className="text-3xl sm:text-5xl font-bold">SƯ MỆNH</h2>
                        <p>Sứ mệnh của Mellow Sips là mang đến trải nghiệm ẩm thực tuyệt vời cho người dùng và hỗ trợ doanh nghiệp nhà hàng, đồng thời giúp các startup tiết kiệm chi phí lắp đặt hệ thống thẻ rung truyền thống.</p>
                    </div>
                </div>
            </section>
            <section className="max-w-7xl mx-auto px-5 py-10 space-y-10">
                <h2 className="text-3xl sm:text-5xl font-bold">MỤC TIÊU</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    <div className="space-y-2">
                        <img className="block w-full aspect-video object-cover rounded" src="/images/about-us-target-1.png" alt="about-us" />
                        <p>Cung cấp trải nghiệm ẩm thực tuyệt vời cho người dùng.</p>
                    </div>
                    <div className="space-y-2">
                        <img className="block w-full aspect-video object-cover rounded" src="/images/about-us-target-2.png" alt="about-us" />
                        <p>Hỗ trợ doanh nghiệp nhà hàng tăng cường khách hàng và quảng bá thương hiệu.</p>
                    </div>
                    <div className="space-y-2">
                        <img className="block w-full aspect-video object-cover rounded" src="/images/about-us-target-3.png" alt="about-us" />
                        <p>Mở rộng hoạt động và phát triển ở các địa điểm mới.</p>
                    </div>
                    <div className="space-y-2">
                        <img className="block w-full aspect-video object-cover rounded" src="/images/about-us-target-4.png" alt="about-us" />
                        <p>Xây dựng cộng đồng yêu thích và đáng tin cậy.</p>
                    </div>
                </div>
            </section>
            <section className="max-w-7xl mx-auto px-5 py-10 space-y-10">
                <h2 className="text-3xl sm:text-5xl font-bold">CAM KẾT CỦA MELLOW SIPS ĐỐI VỚI ĐỐI TÁC NHÀ HÀNG</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="space-y-2">
                        <img className="block w-full aspect-video object-cover rounded" src="/images/about-us-commit-1.png" alt="about-us" />
                        <p>Cung cấp trải nghiệm ẩm thực tuyệt vời cho người dùng.</p>
                    </div>
                    <div className="space-y-2">
                        <img className="block w-full aspect-video object-cover rounded" src="/images/about-us-commit-2.png" alt="about-us" />
                        <p>Hỗ trợ doanh nghiệp nhà hàng tăng cường khách hàng và quảng bá thương hiệu.</p>
                    </div>
                    <div className="space-y-2">
                        <img className="block w-full aspect-video object-cover rounded" src="/images/about-us-commit-3.png" alt="about-us" />
                        <p>Mở rộng hoạt động và phát triển ở các địa điểm mới.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUsPage