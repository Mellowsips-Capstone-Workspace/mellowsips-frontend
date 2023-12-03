import { isEmpty } from "lodash"
import DashboardLayout from "modules/Layout/Dashboard"
import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import PrintRoutes from "routers/PrintRoutes"
import VoucherRoute from "routers/VoucherRoutes"
import { DashboardRoute, MenuRoute, OrderRoute, ProductRoute, QRRoute, StoreAccountRoute, StoreRoute } from "routers/WidgetRouters"
import { useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"



const ManageRoutes: FC = () => {
    const principle = useAppSelector<Principle>(state => state.authenticate.principle!)
    const pending = isEmpty(principle.partnerId)

    return (
        <Routes>
            {
                PrintRoutes
            }
            <Route
                path="*"
                element={<DashboardLayout />}
            >
                {pending ? null : DashboardRoute}
                {pending ? null : StoreRoute}
                {pending ? null : ProductRoute}
                {pending ? null : QRRoute}
                {pending ? null : OrderRoute}
                {pending ? null : VoucherRoute}
                {pending ? null : MenuRoute}
                {pending ? null : StoreAccountRoute}
            </Route>
        </Routes>
    )
}

export default ManageRoutes