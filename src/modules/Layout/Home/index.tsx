import Footer from "modules/Home/components/Footer"
import Header from "modules/Home/components/Header"
import { Outlet } from "react-router-dom"

const HomeLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <div className="pt-14">
                <Footer />
            </div>
        </>
    )
}

export default HomeLayout