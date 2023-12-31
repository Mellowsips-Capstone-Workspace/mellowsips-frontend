import { WidgetLoading } from "modules/Common/WaitingPage";
import DashboardLayout from "modules/Layout/Dashboard";
import { FC, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import VoucherRoute from "routers/VoucherRoutes";

const ApplicationManageWidget = lazy(() => import("modules/Admin/widgets/ApplicationManage"))
const ApplicationProcessWidget = lazy(() => import('modules/Admin/widgets/ApplicationProcess'))
const ApplicationCreateStoreProcessWidget = lazy(() => import('modules/Admin/widgets/ApplicationCreateStoreProcess'))
const AccountManageWidget = lazy(() => import('modules/Admin/widgets/AccountManage'))
const PartnersManageWidget = lazy(() => import('modules/Admin/widgets/PartnerManage'))
const DashboardWidget = lazy(() => import('modules/Admin/widgets/Dashboard'))

const AdminRoutes: FC = () => {
    return (
        <Routes>
            <Route
                path="*"
                element={<DashboardLayout />}
            >
                <Route path="applications"  >
                    <Route
                        index
                        element={
                            <Suspense fallback={<WidgetLoading />}>
                                <ApplicationManageWidget />
                            </Suspense>
                        }
                    />
                    <Route
                        path="view"
                        element={
                            <Suspense fallback={<WidgetLoading />}>
                                <ApplicationProcessWidget />
                            </Suspense>
                        }
                    />
                    <Route
                        path="add-store/view"
                        element={
                            <Suspense fallback={<WidgetLoading />}>
                                <ApplicationCreateStoreProcessWidget />
                            </Suspense>
                        }
                    />
                </Route>

                {VoucherRoute}
                <Route
                    path="accounts"
                    element={
                        <Suspense fallback={<WidgetLoading />}>
                            <AccountManageWidget />
                        </Suspense>
                    }
                />
                <Route
                    path="partners"
                    element={
                        <Suspense fallback={<WidgetLoading />}>
                            <PartnersManageWidget />
                        </Suspense>
                    }
                />

                <Route
                    path="dashboard"
                    element={
                        <Suspense fallback={<WidgetLoading />}>
                            <DashboardWidget />
                        </Suspense>
                    }
                />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes
