import { PlusIcon, ReloadIcon } from '@radix-ui/react-icons'
import useBoolean from 'hooks/useBoolean'
import { isEmpty, isUndefined } from 'lodash'
import Button from 'modules/Common/Button'
import DocumentPreview from 'modules/Common/Document'
import Modal from 'modules/Common/Modal/Modal'
import showToast from 'modules/Common/Toast'
import CloneProduct from 'modules/Manager/components/UpdateMenu/CloneProduct'
import CreateProduct from 'modules/Manager/components/UpdateMenu/CreateProduct'
import { FC, MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { useParams } from 'react-router-dom'
import ProductService from 'services/ProductService'
import { Product } from "types/product"

type MenuProductProps = {
    products: Product[]
    refetchProducts: () => void
}

const MenuProducts: FC<MenuProductProps> = ({ refetchProducts, products }) => {
    const { id: menuId } = useParams()
    const currentParentId = useRef<string | undefined>(undefined)
    const [displayCreateMode, setDisplayCreateMode] = useBoolean(false)
    const [displayClone, setDisplayClone] = useBoolean(false)
    const [displayCreateNew, setDisplayCreateNew] = useBoolean(false)
    const { on: onClone } = setDisplayClone
    const { on: onCreateNew } = setDisplayCreateNew
    const { off: offDisplayCreateMode } = setDisplayCreateMode
    const [templates, setTemplates] = useState<Product[]>([])

    const fetchProductTemplates = useCallback(async () => {
        const { status, body } = await ProductService.searchTemplates({ pagination: { page: 1, offset: 1000 } })
        if (status !== 200 || isEmpty(body) || isEmpty(body.data.results)) {
            setTemplates([])
            showToast(
                {
                    type: "warning",
                    title: "Chú ý",
                    message: "Hiện tại không thể tải được các sản phẩm mẫu."
                }
            )
        } else {
            setTemplates(body.data.results)
        }
    }, [])

    const addProduct = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        const { parentId } = event.currentTarget.dataset
        if (isEmpty(parentId) || isUndefined(parentId)) {
            currentParentId.current = undefined
            onCreateNew()
        } else {
            currentParentId.current = parentId
            onClone()
        }
        offDisplayCreateMode()
    }, [offDisplayCreateMode, onClone, onCreateNew])

    useEffect(() => {
        fetchProductTemplates()
    }, [fetchProductTemplates])

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='font-medium text-lg text-main-primary space-x-1'>Sản phẩm của menu</h2>
                <div className='space-x-5'>
                    <Button
                        variant="default"
                        type='button'
                        onClick={refetchProducts}
                    >
                        <ReloadIcon className='mr-1 h-4 w-4' />
                        <span>Sản phẩm</span>
                    </Button>
                    <Button
                        variant="primary"
                        type='button'
                        onClick={setDisplayCreateMode.on}
                    >
                        <PlusIcon className='mr-1 h-4 w-4' />
                        <span>Tạo mới</span>
                    </Button>
                </div>
            </div>
            <ul className="py-2 grid grid-cols-2 gap-2">
                {
                    products.length ? products.map(
                        (item, index) => (
                            <li
                                key={index}
                                className="h-16 p-1 flex items-center space-x-2 rounded border px-2 flex-none group overflow-x-hidden"
                            >
                                <div className='h-full aspect-square flex items-center flex-none'>
                                    <DocumentPreview
                                        documentId={item.coverImage}
                                        displayFileName={false}
                                        loadingMessage={false}
                                    />
                                </div>
                                <div className='h-full grow'>
                                    <p className='truncate'>{item.name}</p>
                                    <p className='text-main-primary font-medium text-sm'>{item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
                                </div>
                                {/* <button
                                    type='button'
                                    data-id={item.id}
                                    onClick={remove}
                                    className='block w-fit flex-none'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-red-500 cursor-pointer">
                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                </button> */}
                            </li>
                        )
                    ) : (
                        <p className='col-span-2 text-main-primary text-xs italic text-center'>Vui lòng thêm sản phẩm cho danh mục!</p>
                    )
                }
            </ul>
            <Modal
                flag={displayCreateMode}
                closeModal={offDisplayCreateMode}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 p-5 flex items-center"
                innerClassName="w-220 space-y-5 flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <p className="flex-none px-5 py-2 shadow border-b truncate font-medium">Thêm sản phẩm vào menu</p>
                <div className='px-5 space-y-5 grow overflow-y-auto'>
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
                                templates.map(
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
                                                Sao chép
                                            </Button>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex-none border-t py-2 px-5 flex justify-end space-x-5">
                    <Button
                        type="button"
                        variant="default"
                        onClick={setDisplayCreateMode.off}
                    >
                        Huỷ
                    </Button>
                </div>
            </Modal >

            <CloneProduct
                menuId={menuId!}
                display={displayClone}
                setDisplay={setDisplayClone}
                parentId={currentParentId.current!}
                refetchProducts={refetchProducts}
            />

            <CreateProduct
                menuId={menuId!}
                display={displayCreateNew}
                setDisplay={setDisplayCreateNew}
                refetchProducts={refetchProducts}
            />
        </>
    )
}

export default MenuProducts