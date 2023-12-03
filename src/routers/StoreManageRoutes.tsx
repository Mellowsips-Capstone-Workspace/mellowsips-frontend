import DashboardLayout from "modules/Layout/Dashboard"
import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import PrintRoutes from "routers/PrintRoutes"
import VoucherRoute from "routers/VoucherRoutes"
import { MenuRoute, OrderRoute, ProductRoute, QRRoute, StoreAccountRoute, StoreRoute } from "routers/WidgetRouters"

const StoreManageRoutes: FC = () => {

    return (
        <Routes>
            {
                PrintRoutes
            }
            <Route
                path="*"
                element={<DashboardLayout />}
            >
                {StoreRoute}
                {ProductRoute}
                {QRRoute}
                {OrderRoute}
                {VoucherRoute}
                {MenuRoute}
                {StoreAccountRoute}
                <Route
                    path="*"
                    element={<Navigate to="/orders" replace={true} />}
                />
            </Route>
        </Routes>
    )
}

export default StoreManageRoutes