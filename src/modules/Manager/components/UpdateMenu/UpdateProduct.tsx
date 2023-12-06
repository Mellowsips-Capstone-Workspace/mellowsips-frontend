import { Form, Formik } from 'formik';
import { isArray, isEmpty } from 'lodash';
import FormikTextField from 'modules/Common/FormikTextField';
import Loading from 'modules/Common/Loading';
import Modal from 'modules/Common/Modal/Modal';
import CoverImage from 'modules/Common/Product/CoverImage';
import ProductAction from 'modules/Common/Product/ProductAction';
import ProductOptionSections from 'modules/Common/Product/ProductOptionSections';
import showToast from 'modules/Common/Toast';
import { FC, useEffect, useState } from 'react';
import ProductService from 'services/ProductService';
import { Product } from 'types/product';
import { array, boolean, number, object, string } from 'yup';

type UpdateProductProps = {
    productId: string
    display: boolean
    setDisplay: {
        on: () => void
        off: () => void
        toggle: () => void
    }
    refetchProducts: () => void
}

const UpdateProduct: FC<UpdateProductProps> = ({ productId, display, setDisplay, refetchProducts }) => {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        if (!display) {
            return
        }

        (
            async () => {
                setLoading(true)
                const { status, body } = await ProductService.getById(productId!)
                setLoading(false)

                if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
                    showToast(
                        {
                            type: "warning",
                            title: "Cảnh báo",
                            message: "Tải dữ liệu sản phẩm thất bại."
                        }
                    )
                    return
                }
                setProduct(body.data)
            }
        )()
    }, [productId, display])


    return (
        <Modal
            flag={display}
            closeModal={setDisplay.off}
            closeOutside={false}
            className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-10 px-20 flex items-center"
            innerClassName="w-full flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
        >
            <div className='px-5 py-2 flex justify-between items-center shadow border-b'>
                <p className="flex-none truncate font-medium">Thông tin sản phẩm</p>
                <button
                    type='button'
                    className='block h-6 w-6 p-0.5 cursor-pointer rounded-full hover:bg-red-500 hover:text-white transition-colors'
                    onClick={setDisplay.off}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-full w-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </button>
            </div>
            <div className='grow p-5 overflow-y-auto scrollbar-sm'>
                {
                    loading ? (
                        <div className="w-fit mx-auto py-10 space-y-1">
                            <div className="w-fit mx-auto opacity-80">
                                <Loading.Circle className="text-main-primary" />
                            </div>
                            <p className="w-fit text-center text-opacity-80 italic text-sm">Đang tải dữ liệu</p>
                        </div>
                    ) : product ? (
                        <Formik
                            initialValues={
                                {
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    coverImage: product.coverImage,
                                    categories: product.categories,
                                    isSoldOut: product.isSoldOut,
                                    storeId: product.storeId || null,
                                    description: isEmpty(product.description) ? "" : product.description,
                                    productOptionSections: isArray(product.productOptionSections) ? product.productOptionSections : []
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

                                    const { body, status } = await ProductService.update(productId, payload)
                                    if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
                                        showToast(
                                            {
                                                type: "error",
                                                title: "Thất bại",
                                                message: "Cập nhật sản phẩm thất bại."
                                            }
                                        )
                                        return
                                    }
                                    showToast(
                                        {
                                            type: "success",
                                            title: "Thành công",
                                            message: "Cập nhật sản phẩm thành công."
                                        }
                                    )
                                    setDisplay.off()
                                    refetchProducts()
                                }
                            }
                        >
                            <Form className="space-y-5">
                                <div className="grid grid-cols-4 gap-5">
                                    <div className="col-span-3 bg-white p-5 space-y-5 border rounded">
                                        <div className="grid grid-cols-2 gap-5">
                                            <div className="space-y-1" >
                                                <label className="text-gray-500 font-medium">Tên sản phẩm</label>
                                                <div
                                                    aria-disabled={!isEmpty(product.partnerId)}
                                                    className='aria-disabled:cursor-not-allowed opacity-80'
                                                >
                                                    <div
                                                        aria-disabled={!isEmpty(product.partnerId)}
                                                        className='aria-disabled:pointer-events-none'
                                                    >
                                                        <FormikTextField.Input
                                                            name="name"
                                                            placeholder="Ví dụ: Trà đào"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <FormikTextField.CurrencyVNDInput
                                                className="space-y-1"
                                                label="Giá"
                                                labelClassName="text-gray-500 font-medium"
                                                name="price"
                                                placeholder="Ví dụ: 1000đ"
                                            />
                                        </div>
                                        <div className="flex gap-5">
                                            <div className="flex-none h-40 aspect-square rounded border">
                                                <CoverImage />
                                            </div>
                                            <div className="grow">
                                                <div
                                                    aria-disabled={!isEmpty(product.partnerId)}
                                                    className='aria-disabled:cursor-not-allowed opacity-80'
                                                >
                                                    <div
                                                        aria-disabled={!isEmpty(product.partnerId)}
                                                        className='aria-disabled:pointer-events-none'
                                                    >
                                                        <FormikTextField.Textarea
                                                            row={6}
                                                            name="description"
                                                            placeholder="Thêm mô tả chi tiết."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-5 space-y-5 border rounded">
                                        <ProductAction
                                            selectStore={false}
                                        />
                                    </div>
                                </div>
                                <div className='border rounded shadow'>
                                    <ProductOptionSections />
                                </div>
                            </Form>
                        </Formik>
                    ) : null
                }
            </div>
        </Modal>
    )
}

export default UpdateProduct