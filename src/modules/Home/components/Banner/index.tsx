import { Link } from "react-router-dom"
import "./style.css"

const Banner = () => {
    return (
        <div className="home-page-banner relative">
            <h2 className="static sm:absolute w-full text-center text-xl sm:text-4xl pt-6 text-main-primary font-bold"> ĐĂNG KÝ TRỞ THÀNH ĐỐI TÁC <br /> VỚI MELLOW SIPS</h2>
            <div className="absolute w-full bottom-0 sm:top-40">
                <Link
                    to="/register"
                    className="block w-80 mx-auto text-lg text-center py-2 bg-main-primary text-white rounded-lg font-bold"
                >
                    Đăng ký ngay
                </Link>
            </div>
        </div>
    )
}

export default Banner