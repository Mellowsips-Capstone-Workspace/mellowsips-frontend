import { isEmpty } from "lodash"
import DashboardLayout from "modules/Layout/Dashboard"
import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import PrintRoutes from "routers/PrintRoutes"
import VoucherRoute from "routers/VoucherRoutes"
import { ApplicationRoute, DashboardRoute, MenuRoutes, OrderRoute, ProductRoute, QRRoute, StoreAccountRoute, StoreReviewRoute, StoreRoute } from "routers/WidgetRouters"
import { useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"

const OwnerRoutes: FC = () => {
    const principle = useAppSelector<Principle>(state => state.authenticate.principle!)
    const pending = isEmpty(principle.partnerId)

    return (
        <Routes>
            {PrintRoutes}
            <Route
                path="*"
                element={<DashboardLayout />}
            >
                {
                    ApplicationRoute
                }
                {pending ? null : DashboardRoute}
                {pending ? null : StoreRoute}
                {pending ? null : ProductRoute}
                {pending ? null : QRRoute}
                {pending ? null : OrderRoute}
                {pending ? null : VoucherRoute}
                {pending ? null : MenuRoutes}
                {pending ? null : StoreAccountRoute}
                {pending ? null : StoreReviewRoute}
            </Route>
        </Routes>
    )
}

export default OwnerRoutes