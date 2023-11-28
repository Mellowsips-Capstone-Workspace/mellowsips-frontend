import { Form, Formik } from "formik"
import { isArray, isEmpty } from "lodash"
import showToast from "modules/Common/Toast"
import EssentialInfo from "modules/Manager/components/Product/components/EssentialInfo"
import ProductOptionSections from "modules/Manager/components/Product/components/ProductOptionSections"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import ProductService from "services/ProductService"
import { array, boolean, number, object, string } from "yup"

const AddProduct: FC = () => {
    const navigate = useNavigate()

    return (
        <Formik
            initialValues={
                {
                    name: "",
                    price: 0,
                    coverImage: "",
                    description: "",
                    categories: [],
                    isSoldOut: false,
                    storeId: "",
                    productOptionSections: []
                }
            }
            validationSchema={
                object(
                    {
                        name: string().required("Trường này không được để trống."),
                        price: number().required("Trường này không được để trống."),
                        coverImage: string().required("Trường này không được để trống."),
                        description: string().nullable(),
                        categories: array(string()),
                        isSoldOut: boolean().required("Trường này không được để trống."),
                        storeId: string().required("Trường này không được để trống."),
                        productOptionSections: array(
                            object(
                                {
                                    name: string().required("Trường này không được để trống."),
                                    isRequired: boolean().required("Trường này không được để trống."),
                                    maxAllowedChoices: number().required("Trường này không được để trống."),
                                    productAddons: array(
                                        object(
                                            {
                                                name: string().required("Trường này không được để trống."),
                                                price: number().required("Trường này không được để trống."),
                                                isSoldOut: boolean().required("Trường này không được để trống."),
                                            }
                                        )
                                    ).required("Trường này không được để trống."),
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
                            (section: any, index) => (
                                {
                                    ...section,
                                    priority: index + 1
                                }
                            )
                        ) : []
                    }

                    const { body, status } = await ProductService.create(payload)
                    if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
                        showToast(
                            {
                                type: "error",
                                title: "Thất bại",
                                message: "Tạo sản phẩm thất bại."
                            }
                        )
                        return
                    }
                    showToast(
                        {
                            type: "success",
                            title: "Thành công",
                            message: "Tạo sản phẩm thành công."
                        }
                    )
                    navigate("/products")

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

export default AddProduct