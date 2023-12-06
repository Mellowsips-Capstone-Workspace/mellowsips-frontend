import { Form, Formik } from 'formik';
import { isArray, isEmpty } from 'lodash';
import Modal from 'modules/Common/Modal/Modal';
import EssentialInfo from 'modules/Common/Product/EssentialInfo';
import ProductOptionSections from 'modules/Common/Product/ProductOptionSections';
import showToast from 'modules/Common/Toast';
import { FC } from 'react';
import ProductService from 'services/ProductService';
import { array, boolean, number, object, string } from 'yup';

type CreateProductProps = {
    menuId: string
    display: boolean
    setDisplay: {
        on: () => void
        off: () => void
        toggle: () => void
    }
    refetchProducts: () => void
}

const CreateProduct: FC<CreateProductProps> = ({ menuId, display, setDisplay, refetchProducts }) => {
    return (
        <Modal
            flag={display}
            closeModal={setDisplay.off}
            closeOutside={false}
            className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-10 px-20 flex items-center"
            innerClassName="w-full flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
        >
            <div className='px-5 py-2 flex justify-between items-center shadow border-b'>
                <p className="flex-none truncate font-medium">Thêm sản phẩm vào menu</p>
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
                <Formik
                    initialValues={
                        {
                            name: "",
                            price: 0,
                            coverImage: "",
                            description: "",
                            categories: [],
                            isSoldOut: false,
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
                            setDisplay.off()
                            refetchProducts()
                        }
                    }
                >
                    <Form className="space-y-5">
                        <EssentialInfo
                            selectStore={false}
                        />
                        <div className='border rounded shadow'>
                            <ProductOptionSections />
                        </div>
                    </Form>
                </Formik>

            </div>

        </Modal>


    )
}

export default CreateProduct