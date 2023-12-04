import { Waiting, WidgetLoading } from "modules/Common/WaitingPage"
import AddMenu from "modules/Manager/widgets/AddMenu"
import MenuManage from "modules/Manager/widgets/MenuManage"
import UpdateMenu from "modules/Manager/widgets/UpdateMenu"
import { Suspense, lazy } from "react"
import { Navigate, Route } from "react-router-dom"

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
const StoreAccountManageWidget = lazy(() => import("modules/Manager/widgets/StoreAccountManage"))
const MenuProductManageWidget = lazy(() => import("modules/Manager/widgets/MenuProduct"))

export const ApplicationRoute = (
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

export const StoreRoute = (
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

export const ProductRoute = (
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

export const OrderRoute = (
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

export const QRRoute = (
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

export const MenuRoute = (
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
export const MenuProductRoute = (
    <Route
        path="menu-product"
        element={
            <Suspense fallback={<Waiting />}>
                <MenuProductManageWidget />
            </Suspense>
        }
    />
)

export const StoreAccountRoute = (
    <Route path="accounts">
        <Route
            path="*"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <StoreAccountManageWidget />
                </Suspense>
            }
        />
    </Route>
)

export const DashboardRoute = (
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