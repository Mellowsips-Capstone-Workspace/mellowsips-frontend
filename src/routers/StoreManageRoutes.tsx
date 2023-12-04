import DashboardLayout from "modules/Layout/Dashboard"
import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import PrintRoutes from "routers/PrintRoutes"
import VoucherRoute from "routers/VoucherRoutes"
import { MenuProductRoutes, MenuRoutes, OrderRoute, ProductRoute, QRRoute, StoreAccountRoute, StoreRoute } from "routers/WidgetRouters"

const StoreManageRoutes: FC = () => {

    return (
        <Routes>
            {PrintRoutes}
            {MenuProductRoutes}
            <Route
                path="*"
                element={<DashboardLayout />}
            >
                {StoreRoute}
                {ProductRoute}
                {QRRoute}
                {OrderRoute}
                {VoucherRoute}
                {MenuRoutes}
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