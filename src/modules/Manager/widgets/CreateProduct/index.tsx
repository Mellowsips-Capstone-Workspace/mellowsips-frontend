import { Widget } from "modules/Layout/Dashboard"
import AddProduct from "modules/Manager/components/AddProduct"

const CreateProduct = () => {

    return (
        <Widget className='space-y-5'>
            <div className="bg-white p-5 shadow rounded">
                <h2 className="font-medium text-lg">Thêm sản phẩm</h2>
                <p>Thêm mô tả sản phẩm của bạn và thông tin cần ở đây</p>
            </div>
            <AddProduct />
        </Widget>
    )
}

export default CreateProduct