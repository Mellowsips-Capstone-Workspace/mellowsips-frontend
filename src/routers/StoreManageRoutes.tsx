import DashboardLayout from "modules/Layout/Dashboard"
import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import PrintRoutes from "routers/PrintRoutes"
import VoucherRoute from "routers/VoucherRoutes"
import { DashboardRoute, MenuRoute, OrderRoute, ProductRoute, QRRoute, StoreAccountRoute, StoreRoute } from "routers/WidgetRouters"

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
                {DashboardRoute}
                {StoreRoute}
                {ProductRoute}
                {QRRoute}
                {OrderRoute}
                {VoucherRoute}
                {MenuRoute}
                {StoreAccountRoute}
            </Route>
        </Routes>
    )
}

export default StoreManageRoutes