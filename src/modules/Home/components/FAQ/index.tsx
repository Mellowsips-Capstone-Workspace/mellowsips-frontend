import QuestionAndAnswer from "modules/Common/QuestionAndAnswer";

const FAQ = () => {
    return (
        <div className="max-w-7xl mx-auto px-5 space-y-10">
            <QuestionAndAnswer
                question="Phí đăng ký / Ký hợp đồng là bao nhiêu ?"
                answer="Hiện tại Mellow Sips chỉ mới triển khai thu phí các cửa hàng đối tác tại khu vực Hồ Chí Minh. Thông tin thanh toán phí đăng ký sẽ được gửi vào email của cửa hàng sau khi đăng ký thành công."
            />
            <QuestionAndAnswer
                question="Bao lâu thì cửa hàng tôi được online trên ứng dụng ?"
                answer={
                    (
                        <div className="space-y-1">
                            <p>5 - 7 ngày làm việc (trừ thứ 7, CN, và các ngày lễ/Tết) kể từ khi Mellow Sips nhận được đầy đủ thông tin từ Quý nhà hàng.</p>
                            <p><span className="font-medium">Lưu ý:</span> Quý Nhà hàng cần hoàn tất thủ tục ký hợp đồng đúng thời hạn theo hướng dẫn của nhân viên tư vấn.</p>
                        </div>
                    )
                }
            />
            <QuestionAndAnswer
                question="Ứng dụng Mellow Sips Merchant ( Mellow Sips Đối tác ) là gì ?"
                answer="Ứng dụng Mellow Sips Merchant là ứng dụng quản lý dành riêng cho đối tác nhà hàng của Mellow Sips. Ứng dụng chạy trên thiết bị điện thoại di động. Mellow Sips Merchant hỗ trợ đối tác nhà hàng nhận đơn, xem báo cáo doanh thu, quản lý thực đơn, cửa hàng và nhiều tiện ích khác."
            />
            <QuestionAndAnswer
                question="Tôi có thể tự điều chỉnh giờ hoạt động và thực đơn cho quán được không ?"
                answer={
                    (
                        <div className="space-y-1">
                            <p>Quý nhà hàng có thể chủ động cập nhật giờ hoạt động, điều chỉnh thực đơn, đóng/ mở món, tạm ngưng nhận đơn hàng, … trên ứng dụng Mellow Sips Merchant.</p>
                            <p><span className="font-medium">Lưu ý:</span> giá bán trên Mellow Sips không cao hơn giá bán tại cửa hàng!</p>
                        </div>
                    )
                }
            />
            <QuestionAndAnswer
                question="Tôi gặp trục trặc khi đăng ký làm đối tác , liên hệ qua kênh nào để được hỗ trợ ?"
                answer={
                    (
                        <p>Vui lòng liên hệ <span className="text-cool-grey font-medium">19001234</span>  hoặc <span className="text-cool-grey font-medium">mellowsips@gmail.com</span> để được hỗ trợ nhanh nhất!</p>
                    )
                }
            />
        </div>
    )
}

export default FAQ;