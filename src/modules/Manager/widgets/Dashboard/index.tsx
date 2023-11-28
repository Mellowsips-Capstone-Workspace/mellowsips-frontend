import { Widget } from "modules/Layout/Dashboard";
import OrderStatusStatistic from "modules/Manager/components/Dashboard/OrderStatusStatistic";

const Dashboard = () => {
    return (
        <Widget className="grid grid-cols-2 gap-5">
            {/* <StatCards className="col-span-2" />
            <DispatchPlanning className="space-y-5" />
            <OpenSalesOrder className="space-y-5" />
            <FleetStatus className="space-y-5" />
            <StorageSummary /> */}
            <OrderStatusStatistic className="h-fit" />
        </Widget>
    )
}

export default Dashboard