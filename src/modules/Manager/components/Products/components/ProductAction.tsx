import useBoolean from 'hooks/useBoolean'
import Button from 'modules/Common/Button'
import Loading from 'modules/Common/Loading'
import Modal from 'modules/Common/Modal/Modal'
import showToast from 'modules/Common/Toast'
import { FC, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductService from 'services/ProductService'
import { Product } from 'types/product'

export type ProductItem = Product & {
    refetch: () => void | any
}

type ProductActionProps = {
    product: ProductItem
}

const ProductAction: FC<ProductActionProps> = ({ product: { id, refetch, name } }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [display, setDisplay] = useBoolean(false)
    const { off: offModal } = setDisplay

    const handleRemove = useCallback(async () => {
        setIsSubmitting(true)
        const { status } = await ProductService.delete(id!)
        setIsSubmitting(false)
        if (status === 200) {
            refetch()
            showToast(
                {
                    type: 'success',
                    title: "Thành công",
                    message: "Xoá sản phẩm thành công!"
                }
            )
            offModal()
            return
        }
        showToast(
            {
                type: 'warning',
                title: "Thất bại",
                message: "Xoá sản phẩm thất bại."
            }
        )
    }, [refetch, id, offModal])

    return (
        <div className="flex space-x-2 justify-center">
            <Link
                state={{ id }}
                to={id!}
                className="border-gray-400 text-gray-500 hover:bg-indigo-500 hover:text-white border block h-7 w-7 p-1 rounded transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </Link>

            <button
                type="button"
                onClick={setDisplay.on}
                disabled={isSubmitting}
                className="border-gray-400 text-gray-500 hover:bg-main-primary hover:text-white border block h-7 w-7 p-1 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>

            <Modal
                flag={display}
                closeModal={setDisplay.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <div className='space-y-5'>
                    <p className="px-5 py-2 shadow border-b truncate font-medium">Xác nhận xoá sản phẩm</p>
                    <div className='space-y-5'>
                        <p className='px-5'><span className='font-medium text-red-500'>Xác nhận xoá.</span> Sản phẩm "{name}" sẽ bị xoá.</p>
                        <div className="border-t py-2 px-5 flex justify-end space-x-5">
                            <Button
                                type="button"
                                variant="red"
                                onClick={handleRemove}
                                className="group"
                            >
                                {
                                    isSubmitting ? (
                                        <span className='hidden group-disabled:block mr-2'>
                                            <Loading.Circle size={14} />
                                        </span>
                                    ) : null
                                }
                                <span>Xoá</span>
                            </Button>
                            <Button
                                type="button"
                                variant="default"
                                onClick={setDisplay.off}
                            >
                                Huỷ
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ProductAction