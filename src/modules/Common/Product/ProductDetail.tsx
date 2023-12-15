import { Form, Formik } from "formik"
import { isArray, isEmpty } from "lodash"
import EssentialInfo from "modules/Common/Product/EssentialInfo"
import ProductOptionSections from "modules/Common/Product/ProductOptionSections"
import showToast from "modules/Common/Toast"
import { FC } from "react"
import ProductService from "services/ProductService"
import { Product as ProductType } from "types/product"
import { array, boolean, number, object, string } from "yup"

const ProductDetail: FC<{ product: ProductType }> = ({ product }) => {
    const { id } = product
    return (
        <Formik
            initialValues={product}
            validationSchema={
                object(
                    {
                        name: string().required("Trường này không được để trống."),
                        price: number().required("Trường này không được để trống."),
                        coverImage: string().required("Trường này không được để trống."),
                        description: string().nullable(),
                        categories: array(string()),
                        isSoldOut: boolean().required("Trường này không được để trống."),
                        storeId: string().nullable(),
                        productOptionSections: array(
                            object(
                                {
                                    name: string().required("Trường này không được để trống."),
                                    isRequired: boolean().required("Trường này không được để trống."),
                                    maxAllowedChoices: number().typeError("Vui lòng nhập giá trị là số").min(0, "Tuỳ chọn không hợp lệ.").required("Trường này không được để trống."),
                                    productAddons: array(
                                        object(
                                            {
                                                name: string().required("Trường này không được để trống."),
                                                price: number().required("Trường này không được để trống."),
                                                isSoldOut: boolean().required("Trường này không được để trống."),
                                            }
                                        )
                                    ).min(1, "Thêm ít nhất 1 lựa chọn.").required("Trường này không được để trống."),
                                }
                            )
                        )
                    }
                )
            }
            onSubmit={
                async ({ productOptionSections, ...values }) => {
                    const payload = {
                        ...values,
                        productOptionSections: isArray(productOptionSections) ? productOptionSections.map(
                            (section, index) => (
                                {
                                    ...section,
                                    priority: index + 1
                                }
                            )
                        ) : []
                    }
                    const { body, status } = await ProductService.update(id!, payload)
                    if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
                        showToast(
                            {
                                type: "error",
                                title: "Thất bại",
                                message: "Cập nhật phẩm thất bại."
                            }
                        )
                        return
                    }
                    showToast(
                        {
                            type: "success",
                            title: "Thành công",
                            message: "Cập nhật phẩm thành công."
                        }
                    )
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