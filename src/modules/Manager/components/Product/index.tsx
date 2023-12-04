import ProductDetail from 'modules/Common/Product/ProductDetail'
import { FC } from 'react'
import { Product as ProductType } from "types/product"


type ProductProps = {
    product: ProductType
}

const Product: FC<ProductProps> = ({ product }) => {

    return (
        <>
            <div className="bg-white p-5 shadow rounded">
                <h2 className="font-medium text-lg">Thông tin sản phẩm</h2>
                <p>Chỉnh sửa mô tả sản phẩm của bạn và thông tin cần ở đây</p>
            </div>
            <ProductDetail product={product} />
        </>
    )
}

export default Product