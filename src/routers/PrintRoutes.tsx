import { Waiting } from "modules/Common/WaitingPage";
import Print from "modules/Print";
import { Suspense, lazy } from "react";
import { Navigate, Route } from "react-router-dom";

const PrintQRPage = lazy(() => import("modules/Print/components/QR"))
const PrintBillPage = lazy(() => import("modules/Print/components/Bill"))

const PrintRoutes = (
    <Route
        path="print"
        element={<Print />}
    >
        <Route
            path="qr"
            element={
                <Suspense fallback={<Waiting />}>
                    <PrintQRPage />
                </Suspense>
            }
        />
        <Route
            path="bill"
            element={
                <Suspense fallback={<Waiting />}>
                    <PrintBillPage />
                </Suspense>
            }
        />
        <Route index path="*" element={<Navigate to="/" replace />} />
    </Route>
)


export default PrintRoutes