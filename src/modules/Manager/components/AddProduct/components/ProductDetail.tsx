import { Form, Formik } from "formik"
import EssentialInfo from "modules/Manager/components/Product/components/EssentialInfo"
import ProductOptionSections from "modules/Manager/components/Product/components/ProductOptionSections"
import { FC } from "react"
import { Product as ProductType } from "types/product"
import REGEX from "validations/regex"
import { number, object, string } from "yup"

const ProductDetail: FC<{ product: ProductType }> = ({ product }) => {

    return (
        <Formik
            initialValues={product}
            validationSchema={
                object(
                    {
                        name: string().matches(REGEX.notBlank, "Tên sản phẩm không hợp lệ.").required("Tên sản phẩm là bắt buộc"),
                        price: number().min(1, "Giá sản phẩm không hợp lệ.").required("Giá sản phẩm là bắt buộc."),
                        description: string().matches(REGEX.notBlank, "Hãy thêm mô tả sản phẩm.").typeError("Hãy thêm mô tả sản phẩm.")
                    }
                )
            }
            onSubmit={
                async (values) => {
                    console.log(values)

                }
            }
        >
            <Form className="space-y-5">
                <EssentialInfo />
                <ProductOptionSections />
            </Form>
        </Formik>
    )
}

export default ProductDetail