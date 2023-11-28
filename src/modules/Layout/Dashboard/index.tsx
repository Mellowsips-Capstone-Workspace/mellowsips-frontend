import { isEmpty } from "lodash"
import ErrorBoundary from "modules/Common/ErrorBoundary/ErrorBoundary"
import Header from "modules/Layout/Dashboard/components/Header"
import Sidebar from "modules/Layout/Dashboard/components/Sidebar"
import { FC, ReactNode } from "react"
import { Outlet, useOutletContext } from "react-router-dom"

const DashboardLayout: FC = () => {

    return (
        <div className="min-h-dynamic-screen bg-app-gradient">
            <Header />
            <div className="sm:flex">
                <div className="hidden sm:block h-dashboard-body overflow-y-auto flex-none min-h-full bg-white border shadow">
                    <Sidebar />
                </div>
                <ErrorBoundary>
                    <Outlet context={{ className: "h-dashboard-body overflow-y-auto sm:grow px-2 py-5 sm:p-5" }} />
                </ErrorBoundary>
            </div>
        </div>
    )
}

type WidgetProps = {
    children: ReactNode
    className?: string
    classOutlet?: boolean
}

export const Widget: FC<WidgetProps> = ({ children, classOutlet = true, className }) => {
    const { className: contextClass } = useOutletContext<{ className: string }>()
    const classBuilder = `${className ? className.concat(" ") : ""}${classOutlet ? contextClass : ""}`
    return (
        <ErrorBoundary>
            <div className={isEmpty(classBuilder) ? undefined : classBuilder}>
                {
                    children
                }
            </div>
        </ErrorBoundary>
    )
}

export default DashboardLayout