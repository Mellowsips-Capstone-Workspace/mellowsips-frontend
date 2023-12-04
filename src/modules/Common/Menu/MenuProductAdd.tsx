import { PlusIcon } from '@radix-ui/react-icons'
import useBoolean from 'hooks/useBoolean'
import { isEmpty } from 'lodash'
import Button from 'modules/Common/Button'
import DocumentPreview from 'modules/Common/Document'
import Modal from 'modules/Common/Modal/Modal'
import showToast from 'modules/Common/Toast'
import { FC, MouseEvent, useCallback, useEffect } from 'react'
import { Product } from 'types/product'

type MenuProductAddProps = {
    products: Product[]
    refetch: () => void
}

const MenuProductAdd: FC<MenuProductAddProps> = ({ products, refetch }) => {
    const [display, setDisplay] = useBoolean(false)
    const { off } = setDisplay

    const addProduct = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        const { parentId } = event.currentTarget.dataset
        window.open(
            window.location.origin.concat(isEmpty(parentId) ? "/menu/product" : `/menu/product?parentId=${parentId}`),
            'popup',
            'width=+width+'
        )
        off()
    }, [off])

    useEffect(() => {
        const onMessage = (message: MessageEvent) => {
            const { data } = message
            if (data === "PRODUCT_CREATED") {
                off()
                refetch()
                showToast(
                    {
                        type: "success",
                        title: "Thành công",
                        message: "Thêm mới sản phẩm thành công."
                    }
                )
            }
        }

        window.addEventListener("message", onMessage)
        return () => window.removeEventListener("message", onMessage)
    }, [refetch, off])

    return (
        <>
            <Button
                variant="primary"
                base="none"
                type='button'
                onClick={setDisplay.on}
                className='px-2 py-0.5 text-xs rounded font-medium'
            >
                <PlusIcon className='mr-1 h-3 w-3' />
                <span>Tạo mới</span>
            </Button>
            <Modal
                flag={display}
                closeModal={setDisplay.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 p-5 flex items-center"
                innerClassName="w-220 space-y-5 flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <p className="px-5 py-2 shadow border-b truncate font-medium">Thêm sản phẩm vào menu</p>

                <div className='px-5 space-y-5'>
                    <Button
                        variant="primary"
                        type='button'
                        onClick={addProduct}
                        data-parent-id={null}
                    >
                        Tạo mới sản phẩm
                    </Button>
                    <div className='space-y-2'>

                        <p className="font-medium text-gray-500">Tạo mới sản phẩm từ mẫu</p>
                        <ul className="grid grid-cols-2 gap-2">
                            {
                                products.map(
                                    (product) => (
                                        <li
                                            key={product.id}
                                            className="h-16 p-1 flex items-center space-x-2 rounded border px-2 flex-none group overflow-x-hidden"
                                        >
                                            <div className='h-full aspect-square flex items-center flex-none'>
                                                <DocumentPreview
                                                    documentId={product.coverImage}
                                                    displayFileName={false}
                                                    loadingMessage={false}
                                                />
                                            </div>
                                            <div className='h-full grow'>
                                                <p className='truncate'>{product.name}</p>
                                                <p className='text-main-primary font-medium text-sm'>{product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
                                            </div>
                                            <Button
                                                variant="indigo"
                                                base="none"
                                                type='button'
                                                onClick={addProduct}
                                                data-parent-id={product.id}
                                                className='block w-fit px-1 rounded text-xs flex-none'
                                            >
                                                Nhân bản
                                            </Button>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="border-t py-2 px-5 flex justify-end space-x-5">
                    <Button
                        type="button"
                        variant="default"
                        onClick={setDisplay.off}
                    >
                        Huỷ
                    </Button>
                </div>
            </Modal >
        </>
    )
}

export default MenuProductAdd