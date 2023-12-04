import ROLE from 'enums/role';
import { Form, Formik } from 'formik';
import { isArray, isEmpty } from 'lodash';
import EssentialInfo from 'modules/Common/Product/EssentialInfo';
import ProductOptionSections from 'modules/Common/Product/ProductOptionSections';
import showToast from 'modules/Common/Toast';
import { FC } from 'react';
import ProductService from 'services/ProductService';
import { useAppSelector } from 'stores/root';
import { Principle } from 'types/authenticate';
import { array, boolean, number, object, string } from 'yup';

type CreateProductProps = {
    menuId: string
}

const CreateProduct: FC<CreateProductProps> = ({ menuId }) => {
    const principle = useAppSelector<Principle>(state => state.authenticate.principle!)

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
                    productOptionSections: [],
                    menuId
                }
            }
            validationSchema={
                object(
                    {
                        name: string().required("Tên không được để trống."),
                        price: number().required("Giá không được để trống."),
                        coverImage: string().required("Ảnh không được để trống."),
                        description: string().nullable(),
                        categories: array(string()),
                        isSoldOut: boolean().required("Trường này không được để trống."),
                        storeId: principle.type !== ROLE.OWNER ? string().nullable() : string().required("Vui lòng chọn cửa hàng."),
                        productOptionSections: array(
                            object(
                                {
                                    name: string().required("Tên nhóm tuỳ chọn không được để trống."),
                                    isRequired: boolean().required("Trường này không được để trống."),
                                    maxAllowedChoices: number().typeError("Tối đa lựa chọn phải là một số.").min(1, "Tuỳ chọn không hợp lệ.").required("Trường này không được để trống."),
                                    productAddons: array(
                                        object(
                                            {
                                                name: string().required("Trường này không được để trống."),
                                                price: number().required("Trường này không được để trống."),
                                                isSoldOut: boolean().required("Trường này không được để trống."),
                                            }
                                        )
                                    ).min(1, "Thêm tối thiểu 1 lựa chọn").required("Trường này không được để trống."),
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
                    window.opener.postMessage("PRODUCT_CREATED", window.origin)
                    window.close()
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

export default CreateProduct