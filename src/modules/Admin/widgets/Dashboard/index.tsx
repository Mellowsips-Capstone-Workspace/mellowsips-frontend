import AccountSummary from "modules/Admin/components/Dashboard/AccountSummary";
import ApplicationSummary from "modules/Admin/components/Dashboard/ApplicationSummary";
import VoucherSummary from "modules/Admin/components/Dashboard/VoucherSummary";
import { Widget } from "modules/Layout/Dashboard";

const Dashboard = () => {
    return (
        <Widget className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
                <AccountSummary />
                <ApplicationSummary />
            </div>
            <VoucherSummary />
        </Widget>
    )
}

export default Dashboard