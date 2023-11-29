import StatCards from "modules/Common/Dashboard/StatCards";
import { Widget } from "modules/Layout/Dashboard";
import OrderRate from "modules/Manager/components/Dashboard/OrderRate";
import OrderStatusStatistic from "modules/Manager/components/Dashboard/OrderStatusStatistic";
import StoreRevenueStatistic from "modules/Manager/components/Dashboard/StoreRevenueStatistic";
import VoucherSummary from "modules/Manager/components/Dashboard/VoucherSummary";

const Dashboard = () => {
    return (
        <Widget className="grid grid-cols-2 gap-5">
            <StatCards className="col-span-2" />
            <OrderStatusStatistic className="h-fit" />
            <OrderRate className="h-fit" />
            <StoreRevenueStatistic className="h-fit" />
            <VoucherSummary />
        </Widget>
    )
}

export default Dashboard