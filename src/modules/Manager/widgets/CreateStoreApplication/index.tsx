import StoreApplicationForm from "modules/Common/Application/components/StoreApplicationForm";
import Breadcrumbs from "modules/Common/Breadcrumbs";
import { Widget } from "modules/Layout/Dashboard";

const CreateStoreApplication = () => {
    return (
        <Widget className="space-y-5">
            <div className="bg-white rounded px-5 py-2 space-y-2 shadow">
                <Breadcrumbs
                    breadcrumbs={["Quản lý đơn", "Tạo đơn"]}
                />
                <h2 className="text-xl font-semibold">Điền thông tin</h2>
                <p >Cung cấp thông tin về cửa hàng ! </p>
            </div>
            <div className="w-full p-5 bg-white rounded shadow">
                <StoreApplicationForm />
            </div>
        </Widget>
    )
}

export default CreateStoreApplication