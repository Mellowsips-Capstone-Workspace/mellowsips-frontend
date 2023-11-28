import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Print = () => {
    useEffect(() => {
        document.title = "Xem trước bản in"

        return () => {
            document.title = "Mellow Sips"
        }
    }, [])

    return (
        <Outlet />
    )
}

export default Print