import { isEmpty } from "lodash"
import { WidgetLoading } from "modules/Common/WaitingPage"
import DashboardLayout from "modules/Layout/Dashboard"
import AddMenu from "modules/Manager/widgets/AddMenu"
import MenuManage from "modules/Manager/widgets/MenuManage"
import StoreAccountManage from "modules/Manager/widgets/StoreAccountManage"
import UpdateMenu from "modules/Manager/widgets/UpdateMenu"
import { FC, Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import PrintRoutes from "routers/PrintRoutes"
import VoucherRoute from "routers/VoucherRoutes"
import { useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"

const ApplicationManage = lazy(() => import("modules/Manager/widgets/ApplicationManage"))
const CreateApplicationWidget = lazy(() => import("modules/Manager/widgets/CreateApplication"))
const EditApplicationWidget = lazy(() => import("modules/Manager/widgets/EditApplication"))
const ApplicationProcessWidget = lazy(() => import("modules/Manager/widgets/ApplicationProcess"))
const QRCodeManageWidget = lazy(() => import("modules/Manager/widgets/QRCodeManage"))
const StoreManageWidget = lazy(() => import("modules/Manager/widgets/StoreManage"))
const StoreWidget = lazy(() => import("modules/Manager/widgets/Store"))
const ProductManageWidget = lazy(() => import("modules/Manager/widgets/ProductManage"))
const ProductDetailWidget = lazy(() => import("modules/Manager/widgets/Product"))
const ProductCreateWidget = lazy(() => import("modules/Manager/widgets/CreateProduct"))
const OrderManageWidget = lazy(() => import("modules/Manager/widgets/OrderManage"))
const DashboardWidget = lazy(() => import("modules/Manager/widgets/Dashboard"))

const ApplicationRoute = (
    <Route path="applications">
        <Route
            path="*"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <ApplicationManage />
                </Suspense>
            }
        />
        <Route
            path="create"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <CreateApplicationWidget />
                </Suspense>
            }
        />
        <Route
            path="edit"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <EditApplicationWidget />
                </Suspense>
            }
        />
        <Route
            path="process"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <ApplicationProcessWidget />
                </Suspense>
            }
        />
    </Route>
)

const StoreRoute = (
    <Route path="stores">
        <Route
            path="*"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <StoreManageWidget />
                </Suspense>
            }
        />
        <Route
            path=":storeId"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <StoreWidget />
                </Suspense>
            }
        />
    </Route>
)

const ProductRoute = (
    <Route path="products">
        <Route
            path="*"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <ProductManageWidget />
                </Suspense>
            }
        />
        <Route
            path=":id"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <ProductDetailWidget />
                </Suspense>
            }
        />
        <Route
            path="create"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <ProductCreateWidget />
                </Suspense>
            }
        />
    </Route>
)

const OrderRoute = (
    <Route path="orders">
        <Route
            path="*"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <OrderManageWidget />
                </Suspense>
            }
        />
    </Route>
)

const QRRoute = (
    <Route path="qr">
        <Route
            path="*"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <QRCodeManageWidget />
                </Suspense>
            }
        />
    </Route>
)

const MenuRoute = (
    <Route path="menus">
        <Route
            path="*"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <MenuManage />
                </Suspense>
            }
        />
        <Route
            path="create"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <AddMenu />
                </Suspense>
            }
        />
        <Route
            path=":id"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <UpdateMenu />
                </Suspense>
            }
        />

    </Route>
)

const StoreAccountRoute = (
    <Route path="account">
        <Route
            path="*"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <StoreAccountManage />
                </Suspense>
            }
        />
    </Route>
)

const DashboardRoute = (
    <>
        <Route
            path="dashboard"
            element={
                (
                    <Suspense fallback={<WidgetLoading />}>
                        <DashboardWidget />
                    </Suspense>
                )

            }
        />
        <Route
            path="*"
            element={<Navigate to="dashboard" />}
        />
    </>
)
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
                {
                    ApplicationRoute
                }
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