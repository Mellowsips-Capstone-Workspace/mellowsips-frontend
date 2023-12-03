import DashboardLayout from "modules/Layout/Dashboard"
import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import PrintRoutes from "routers/PrintRoutes"
import { MenuRoute, OrderRoute, StoreRoute } from "routers/WidgetRouters"


const StaffRoutes: FC = () => {
    return (
        <Routes>
            {
                PrintRoutes
            }
            <Route
                path="*"
                element={<DashboardLayout />}
            >
                {OrderRoute}
                {MenuRoute}
                {StoreRoute}
                <Route
                    path="*"
                    element={<Navigate to="/orders" replace={true} />}
                />
            </Route>
        </Routes>
    )
}

export default StaffRoutes