import { Widget } from 'modules/Layout/Dashboard'
import Products from 'modules/Manager/components/Products'
import { FC } from 'react'

const ProductManage: FC = () => {

    return (
        <Widget className='space-y-5'>
            <div className="bg-white p-5 shadow rounded">
                <h2 className="font-medium text-lg">Quản lý sản phẩm</h2>
                <p>Quản lý thông tin các sản phẩm</p>
            </div>
            <Products />
        </Widget>
    )
}

export default ProductManage