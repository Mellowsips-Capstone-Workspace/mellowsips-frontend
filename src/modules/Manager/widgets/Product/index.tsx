import { isArray, isEmpty } from "lodash"
import { WidgetSkeleton } from "modules/Common/Skeleton"
import showToast from "modules/Common/Toast"
import { Widget } from "modules/Layout/Dashboard"
import Product from "modules/Manager/components/Product"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ProductService from "services/ProductService"
import { Product as ProductType } from "types/product"

const ProductDetail = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [product, setProduct] = useState<ProductType>()


    useEffect(() => {
        if (isEmpty(id)) {
            return
        }

        (
            async () => {
                setLoading(true)
                const { status, body } = await ProductService.getById(id!)
                setLoading(false)

                if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
                    showToast(
                        {
                            type: "warning",
                            title: "Cảnh báo",
                            message: "Tải dữ liệu sản phẩm thất bại."
                        }
                    )
                    navigate("/")
                    return
                }
                setProduct(body.data)
            }
        )()
    }, [id, navigate])

    return (
        <Widget className='space-y-5'>

            {
                loading ? (
                    (
                        <WidgetSkeleton />
                    )
                ) : product ? (
                    <Product
                        product={
                            {
                                ...product,
                                description: isEmpty(product.description) ? "" : product.description,
                                productOptionSections: isArray(product.productOptionSections) ? product.productOptionSections : []
                            }
                        }
                    />
                ) : null
            }

        </Widget>
    )
}

export default ProductDetail