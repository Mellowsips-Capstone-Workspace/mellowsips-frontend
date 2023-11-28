import QuestionAndAnswer from "modules/Common/QuestionAndAnswer";

const FAQPage = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-10 lg:flex">
            <div className="hidden px-5 py-10 sticky top-0 h-fit lg:block lg:w-80 lg:flex-none space-y-5">
                <div className="space-y-2">
                    <img
                        className="block w-28 mx-auto pointer-events-none"
                        src="/images/logo.svg"
                        alt="Logo"
                    />
                    <h2 className="font-semibold text-center text-3xl">Mellow Sips</h2>
                </div>

                <h2 className="font-semibold text-center text-3xl">Cẩm nang dành cho Đối Tác </h2>
                <a
                    href="#faq-1"
                    className="block border shadow rounded-lg p-2.5 font-medium hover:text-main-primary transition-colors"
                >
                    Làm quen cùng MellowSips
                </a>
                <a
                    href="#faq-2"
                    className="block border shadow rounded-lg p-2.5 font-medium hover:text-main-primary transition-colors"
                >
                    Tính Năng Hiển Thị Đánh Giá
                </a>
                <a
                    href="#faq-3"
                    className="block border shadow rounded-lg p-2.5 font-medium hover:text-main-primary transition-colors"
                >
                    Về Ứng Dụng Nhà Hàng Mellow Sips (Merchant App)
                </a>
                <a
                    href="#faq-4"
                    className="block border shadow rounded-lg p-2.5 font-medium hover:text-main-primary transition-colors"
                >
                    Về Phí Dịch Vụ & Thanh Toán
                </a>
                <a
                    href="#faq-5"
                    className="block border shadow rounded-lg p-2.5 font-medium hover:text-main-primary transition-colors"
                >
                    Về Vận Hành Đơn Hàng
                </a>
                <a
                    href="#faq-6"
                    className="block border shadow rounded-lg p-2.5 font-medium hover:text-main-primary transition-colors"
                >
                    Về Cập Nhật Thực Đơn & Quản Lý Thông Tin Cửa Hàng
                </a>
                <div>
                    <h2 className="font-semibold">Trung Tâm Hỗ Trợ</h2>
                    <p>Hotline: 19001234</p>
                    <p>Email: mellowsips@gmail.com</p>
                </div>
            </div>
            <div className="lg:grow space-y-5">
                <div
                    id="faq-1"
                    className="px-5 space-y-5"
                >
                    <h2 className="text-3xl font-semibold">Làm quen cùng MellowSips</h2>
                    <QuestionAndAnswer
                        question="Đăng ký Đối tác Nhà hàng Mealmatch"
                        answer={
                            (
                                <div className="space-y-1">
                                    <p>Để trở thành Đối tác Nhà hàng Mealmatch , Quý Đối tác vui lòng truy cập và đăng ký tại đây.</p>
                                    <p><span className="font-medium">Lưu ý:</span> Mỗi SĐT/email chỉ được đăng kí 1 lần.</p>
                                </div>
                            )
                        }
                    />
                    <QuestionAndAnswer
                        question="Kiểm tra tình trạng đăng ký Đối Tác"
                        answer={
                            (
                                <div className="space-y-1">
                                    <p>Tôi muốn biết tình trạng đăng ký trở thành Đối tác Nhà hàng Mealmatch?</p>
                                    <p>Thời gian xử lý hồ sơ đăng ký Đối tác Nhà hàng mới là 12 ngày làm việc sau khi Quý Nhà hàng hoàn thành biểu mẫu đầu tiên, chi tiết tại bài viết tại đường dẫn.</p>
                                </div>
                            )
                        }
                    />
                </div>
                <div
                    id="faq-2"
                    className="px-5 space-y-5"
                >
                    <h2 className="text-3xl font-semibold">Tính Năng Hiển Thị Đánh Giá</h2>
                    <QuestionAndAnswer
                        question="Dữ liệu được tính từ lúc nào ?"
                        answer="Dữ liệu được tính từ ngày ra mặt ứng dụng."
                    />
                    <QuestionAndAnswer
                        question="Tại sao một số Nhà hàng không có đánh giá ?"
                        answer="Nhà hàng có ít hơn 15 lượt đánh giá sẽ không được hiển thị phần điểm đánh giá này."
                    />
                    <QuestionAndAnswer
                        question="Mealmatch có áp dụng chế tài đối với nhà hàng đó điểm đánh giá thấp không ?"
                        answer="Hiện tại, việc hiển thị chỉ nhằm mục đích duy nhất là cung cấp thông tin cho Khách hàng và Nhà hàng, MellowSips chưa áp dụng bất cứ thay đổi nào về chính sách vận hành. Chúng tôi sẽ thông báo đến Nhà hàng nếu có cập nhật mới."
                    />
                    <QuestionAndAnswer
                        question="Tôi có xem được điểm đánh giá của Nhà hàng trên Ứng dụng Nhà hàng Mealmatch không ?"
                        answer="Hiện tại, điểm đánh giá có thể xem được trên Ứng dụng Nhà hàng."
                    />
                    <QuestionAndAnswer
                        question="Tôi không muốn hiển thị điểm đánh giá của Nhà hàng mình trên Ứng dụng Mealmatch thì có được không ?"
                        answer="Rất tiếc, tính năng này được áp dụng cho toàn bộ Nhà hàng và không có trường hợp ngoại lệ."
                    />
                    <QuestionAndAnswer
                        question="Khi nào khách hàng có thể đánh giá Nhà hàng ?"
                        answer="Khách hàng chỉ có thể đánh giá ngay sau khi đơn hàng hoàn tất. Nếu bỏ qua phần đánh giá này, đơn hàng sẽ không được đánh giá (không có điểm đánh giá)."
                    />
                    <QuestionAndAnswer
                        question="Số lần Khách hàng được đánh giá cho Nhà hàng sau mỗi đơn hàng hoàn tất ?"
                        answer="Chỉ được đánh giá 01 lần."
                    />
                    <QuestionAndAnswer
                        question="Số lần Khách hàng được đánh giá Nhà hàng có bị giới hạn trong ngày không ?"
                        answer="Không giới hạn số lần 1 Khách hàng có thể đánh giá Nhà hàng. Nếu Khách hàng đặt 10 đơn hàng thành công tại Nhà hàng: Khách hàng có 10 lần đánh giá Nhà hàng ngay sau khi đơn hàng hoàn tất."
                    />
                </div>
                <div
                    id="faq-3"
                    className="px-5 space-y-5"
                >
                    <h2 className="text-3xl font-semibold">Về Ứng Dụng Nhà Hàng Mellow Sips (Merchant App)</h2>
                    <QuestionAndAnswer
                        question="Số lần Khách hàng được đánh giá Nhà hàng có bị giới hạn trong ngày không ?"
                        answer={
                            (
                                <div className="space-y-1">
                                    <p>Cách sử dụng các công cụ cần thiết khi hoạt động kinh doanh trên Mealmatch ?</p>
                                    <p>Để hoạt động trên Mealmatch, Đối tác cần nắm rõ cách sử dụng của các công cụ sau:</p>
                                    <p>- Sử dụng Mealmatch Merchant.</p>
                                    <p>- Sử dụng máy POS.</p>
                                    <p>- Sử dụng website Quản lý Nhà hàng.</p>
                                </div>

                            )
                        }
                    />
                    <QuestionAndAnswer
                        question="Thông tin về Tài khoản Ứng dụng nhà hàng ?"
                        answer={
                            (
                                <div className="space-y-1">
                                    <p>Làm thế nào để được Mealmatch cung cấp tài khoản Ứng dụng Nhà hàng (sử dụng trên Mealmatch Merchant App hoặc Mealmatch Website) ?</p>
                                    <p>Việc sử dụng tài khoản quản lý Ứng dụng Nhà hàng là bắt buộc trong quy trình vận hành và hợp tác cùng Mealmatch, do đó, tất cả các nhà hàng là Đối tác của Mealmatch đều được cung cấp tài khoản quản lý Ứng dụng Nhà hàng.</p>
                                    <p><span className="font-medium">Lưu ý:</span> Thông tin tài khoản bao gồm Tên đăng nhập và Mật khẩu được sử dụng trên Mealmatch Merchant App hoặc trên website: [ INSERT LINK ]  sẽ được tự động gửi về địa chỉ email đã được đăng ký của Quý Đối tác ít nhất 1 ngày.</p>

                                </div>
                            )
                        }
                    />
                    <QuestionAndAnswer
                        question="Hỗ trợ đăng nhập tài khoản Ứng dụng nhà hàng ?"
                        answer={
                            (
                                <div className="space-y-1">
                                    <p>Tôi quên tên tài khoản & mật khẩu để đăng nhập vào Ứng dụng Nhà hàng Mellow Sips thì phải làm sao?</p>
                                    <p>1. Trường hợp Quý Đối tác quên tên tài khoản:</p>
                                    <p>- Quý Đối tác có thể tìm lại email "[ Mealmatch ] Thư chào mừng trở thành Đối tác Mealmatch / Welcome to Mealmatch Merchants Community" từ Mealmatch đã gửi để lấy lại thông tin tài khoản đăng nhập.</p>
                                    <p>2. Trường hợp Quý Đối tác quên Mật khẩu:</p>
                                    <p>- Đối tác Nhà hàng bấm vào phần: "Quên mật khẩu" và làm theo hướng dẫn trên Ứng dụng Nhà hàngNếu không thao tác được như hướng dẫn, Quý Đối tác vui lòng liên hệ hotline [ INSERT SĐT ] [ để nhận được sự hỗ trợ kịp thời từ Mealmatch ].</p>

                                </div>
                            )
                        }
                    />

                </div>
                <div
                    id="faq-4"
                    className="px-5 space-y-5"
                >
                    <h2 className="text-3xl font-semibold">Về Phí Dịch Vụ & Thanh Toán</h2>
                    <QuestionAndAnswer
                        question="Báo cáo công nợ cho đối tác nhà hàng sử dụng hình thức Thanh toán trực tuyến ?"
                        answer={
                            (
                                <div className="space-y-1">
                                    <p>Tôi đã tham gia chương trình thanh toán trực tuyến và khấu trừ hoa hồng (phí dịch vụ) trên từng đơn hàng nhưng vẫn nhận được email thông báo công nợ?</p>
                                    <p>- Báo cáo tổng kết doanh thu tháng: Quý Đối tác không phải thanh toán cho Mealmatch. Vui lòng xem mẫu nội dung email:</p>
                                    <p>- Thông báo công nợ tháng: Quý Đối tác có phát sinh công nợ phải thanh toán cho Mealmatch. Vui lòng xem mẫu nội dung email.</p>
                                    <p>Nếu Quý Đối tác chưa rõ, vui lòng phản hồi email Thông báo công nợ để bộ phận phụ trách hỗ trợ tốt hơn.</p>
                                </div>

                            )
                        }
                    />
                    <QuestionAndAnswer
                        question="Lịch trình thanh toán đơn hàng đối với Nhà hàng sử dụng hình thức thanh toán trực tuyến ?"
                        answer={
                            (
                                <div className="space-y-1">
                                    <p>Lịch thanh toán công nợ của Mealmatch ?</p>
                                    <p>Đơn hàng hoàn thành ngày hôm nay, MELLOW SIPS sẽ tiến hành thanh toán vào ngày làm việc tiếp theo. Riêng Thứ 6, Thứ 7, Chủ Nhật sẽ chuyển khoản vào Thứ 2 tuần sau.</p>
                                    <p>Quý Đối tác vui lòng thanh toán qua tài khoản Mealmatch :</p>
                                    <p>Tên người thụ hưởng: Công ty Mealmatch | Tài khoản số: [ INSERT SỐ TÀI KHOẢN ]</p>
                                    <p>Tại ngân hàng: [ INSERT Mealmatch ] </p>
                                    <p>
                                        NỘI DUNG CHUYỂN KHOẢN: “Tên Nhà hàng trên Ứng dụng Mealmatch - thanh toán phí Mealmatch” để kế toán dễ kiểm tra và ghi nhận.
                                    </p>
                                </div>
                            )
                        }
                    />
                    <QuestionAndAnswer
                        question="Thay đổi hình thức thanh toán trực tuyến trở về thanh toán bằng tiền mặt ?"
                        answer="Tôi muốn hủy bò hình thức thanh toán trực tuyến trở về thanh toán bằng tiền mặt? Mealmatch không hỗ trợ hủy bỏ hình thức thanh toán trực tuyến khi Quý Đối tác đã đăng ký ."
                    />
                    <QuestionAndAnswer
                        question="Thay đổi email nhận báo cáo công nợ ?"
                        answer={
                            (
                                <div className="space-y-1">
                                    <p>Tôi muốn thay đổi địa chỉ email nhận báo cáo công nợ?</p>
                                    <p>Quý Đối tác vui lòng gửi email đến Bộ phận phụ trách để được hỗ trợ:</p>
                                    <p>Đối tác Nhà hàng ở Hồ Chí Minh:</p>
                                </div>
                            )
                        }
                    />

                </div>
                <div
                    id="faq-5"
                    className="px-5 space-y-5"
                >
                    <h2 className="text-3xl font-semibold">Về Vận Hành Đơn Hàng</h2>
                    <QuestionAndAnswer
                        question="Từ chối đơn hàng ?"
                        answer="Trong tình huống phải từ chối nhận đơn hàng, tôi cần thao tác như thế nào? Trong quá trình vận hành nhà hàng, hãy luôn đảm bảo các thông tin về thực đơn được chính xác trên MELLOW SIPS và nguyên liệu được chuẩn bị đầy đủ để làm món. Trường hợp bất khả kháng khiến Quý Đối tác phải từ chối nhận đơn hàng (hết món, sai giá...)"
                    />
                    <QuestionAndAnswer
                        question="Khiếu nại đơn hàng ?"
                        answer="Trong tình huống gặp phải các vấn đề cần khiếu nại đơn hàng cho MELLOW SIPS, tôi cần thao tác như thế nào? Trong quy trình thực hiện đơn hàng, khi nhận đươc thông báo đơn hàng tới, Quý Đối tác hãy chuẩn bị nguyên liệu sẵn sàng, tài xế đến mới bắt đầu làm món để tránh các rủi ro về đơn hàng bị hủy. Trường hợp đơn hàng bị hủy (từ nhà hàng, tài xế hoặc khách hàng), Quý Đối tác vui lòng thực hiện việc khiếu nại đơn hàng trong vòng 24 giờ trên Ứng dụng Nhà hàng để MELLOW SIPS nắm được thông tin và xử lý theo quy trình thanh toán công nợ với nhà hàng."
                    />
                    <QuestionAndAnswer
                        question="Chính sách bồi hoàn đơn hàng bị hủy ?"
                        answer="Để tìm hiểu thông tin, Quý Đối tác vui lòng tham khảo các bài viết trên Học viện Mealmatch : - Dành cho Đối tác Nhà hàng Mealmatch: [ INSERT LINK ] - Để hạn chế đơn hàng bị hủy, Quý Đối tác có thể tham khảo một số các bí quyết hữu ích tại bài viết [ INSERT LINK ]."
                    />
                </div>
                <div
                    id="faq-6"
                    className="px-5 space-y-5"
                >
                    <h2 className="text-3xl font-semibold">Về Cập Nhật Thực Đơn & Quản Lý Thông Tin Cửa Hàng</h2>
                    <QuestionAndAnswer
                        question="Cập nhật thông tin cơ bản của cửa hàng ?"
                        answer={
                            (
                                <div className="space-y-1">
                                    <p>
                                        Chính sách bồi hoàn đơn hàng bị hủy.
                                        Để tìm hiểu thông tin, Quý Đối tác vui lòng tham khảo các bài viết trên Học viện Mealmatch :
                                    </p>
                                    <p>- Dành cho Đối tác Nhà hàng Mealmatch: [ INSERT LINK ] </p>
                                    <p>- Để hạn chế đơn hàng bị hủy, Quý Đối tác có thể tham khảo một số các bí quyết hữu ích tại bài viết.</p>
                                </div>
                            )
                        }
                    />
                    <QuestionAndAnswer
                        question="Thay đổi thông tin thực đơn ?"
                        answer="Quý Đối tác Nhà hàng có thể chủ động tự cập nhật và chỉnh sửa thực đơn. Để biết thêm thông tin chi tiết về tính năng và được hướng dẫn chi tiết về các thao tác, Quý Đối tác vui lòng tham khảo bài viết trên Học viện Mealmatch [ INSERT LINK ]"
                    />

                    <QuestionAndAnswer
                        question="Cập nhật hình ảnh của cửa hàng và thực đơn"
                        answer={
                            <div className="space-y-1">
                                <p>Để được hướng dẫn thiết lập thực đơn chuẩn “MELLOW SIPS” và đẹp mắt, Quý Đối tác có thể tham khảo bài viết sau đây.</p>
                                <p>Để biết thêm thông tin về tính năng, được hướng dẫn chi tiết về các thao tác cập nhật hình ảnh hiển thị của Nhà hàng và món ăn trên Ứng dụng MELLOW SIPS, Quý Đối tác vui lòng tham khảo bài viết</p>
                            </div>
                        }
                    />

                </div>
            </div>
        </div>
    )
}

export default FAQPage