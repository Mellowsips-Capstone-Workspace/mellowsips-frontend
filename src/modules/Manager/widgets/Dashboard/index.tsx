import DispatchPlanning from "modules/Common/Dashboard/DispatchPlanning";
import FleetStatus from "modules/Common/Dashboard/FleetStatus";
import OpenSalesOrder from "modules/Common/Dashboard/OpenSalesOrder";
import StatCards from "modules/Common/Dashboard/StatCards";
import StorageSummary from "modules/Common/Dashboard/StorageSummary";
import { Widget } from "modules/Layout/Dashboard";

const Dashboard = () => {
    return (
        <Widget className="grid grid-cols-2 gap-5">
            <StatCards className="col-span-2" />
            <DispatchPlanning className="space-y-5" />
            <OpenSalesOrder className="space-y-5" />
            <FleetStatus className="space-y-5" />
            <StorageSummary />
        </Widget>
    )
}

export default Dashboard