import NotfoundWidget from "modules/Common/Notfound";
import { WidgetLoading } from "modules/Common/WaitingPage";
import DashboardLayout from "modules/Layout/Dashboard";
import { FC, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import VoucherRoute from "routers/VoucherRoutes";

const ApplicationManageWidget = lazy(() => import("modules/Admin/widgets/ApplicationManage"))
const ApplicationProcessWidget = lazy(() => import('modules/Admin/widgets/ApplicationProcess'))

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
                </Route>

                {VoucherRoute}

                <Route path="*" element={<NotfoundWidget />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes
