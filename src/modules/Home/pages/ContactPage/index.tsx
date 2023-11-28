import { Link } from "react-router-dom"

const ContactPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-5 py-10 space-y-5">
            <h2 className="mx-auto text-4xl max-w-md xl:text-6xl xl:max-w-3xl font-bold text-center">KÊNH HỖ TRỢ CHÍNH THỨC CỦA MELLOW SIPS</h2>
            <h3 className="text-center text-2xl text-cool-grey font-semibold">TỔNG ĐÀI: 19001234</h3>
            <h3 className="text-center text-2xl text-cool-grey font-semibold">EMAIL: mellowsips@gmail.com</h3>
            <div className="mx-auto max-w-4xl">
                <p className="text-center">Lưu ý: Các kênh hỗ trợ này chỉ dành cho Đối tác Nhà hàng đã ký hợp đồng cùng Mellow Sips.</p>
                <p className="text-center">Nhà hàng có nhu cầu hợp tác cùng Mellow Sips vui lòng tham khảo chi tiết <Link className="hover:text-main-primary transition-colors" to="/">tại đây</Link>.</p>
            </div>
        </div>
    )
}

export default ContactPage