import { WidgetLoading } from "modules/Common/WaitingPage"
import { Suspense, lazy } from "react"
import { Route } from "react-router-dom"

const VoucherManageWidget = lazy(() => import("modules/Voucher"))


const VoucherRoute = (
    <Route path="vouchers">
        <Route
            path="*"
            element={
                <Suspense fallback={<WidgetLoading />}>
                    <VoucherManageWidget />
                </Suspense>
            }
        />
    </Route>
)

export default VoucherRoute