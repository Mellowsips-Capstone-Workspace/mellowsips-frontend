import { PlusIcon, ReloadIcon } from '@radix-ui/react-icons'
import useBoolean from 'hooks/useBoolean'
import { isEmpty, isUndefined } from 'lodash'
import Button from 'modules/Common/Button'
import DocumentPreview from 'modules/Common/Document'
import Loading from 'modules/Common/Loading'
import Modal from 'modules/Common/Modal/Modal'
import NoResult from 'modules/Common/NoResult'
import showToast from 'modules/Common/Toast'
import CloneProduct from 'modules/Manager/components/UpdateMenu/CloneProduct'
import CreateProduct from 'modules/Manager/components/UpdateMenu/CreateProduct'
import UpdateProduct from 'modules/Manager/components/UpdateMenu/UpdateProduct'
import { FC, MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { useParams } from 'react-router-dom'
import ProductService from 'services/ProductService'
import { Product } from "types/product"

type MenuProductProps = {
    loading: boolean
    products: Product[]
    refetchProducts: () => void
}

const MenuProducts: FC<MenuProductProps> = ({ refetchProducts, products, loading }) => {
    const { id: menuId } = useParams()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const currentProductId = useRef<string | undefined>(undefined)
    const [displayCreateMode, setDisplayCreateMode] = useBoolean(false)
    const [displayClone, setDisplayClone] = useBoolean(false)
    const [displayUpdate, setDisplayUpdate] = useBoolean(false)
    const [displayCreate, setDisplayCreate] = useBoolean(false)
    const [displayDelete, setDisplayDelete] = useBoolean(false)
    const { on: openCloneModal } = setDisplayClone
    const { on: openUpdateModal } = setDisplayUpdate
    const { on: openCreateModal } = setDisplayCreate
    const { on: openDeleteModal, off: closeDeleteModal } = setDisplayDelete
    const { off: offDisplayCreateMode } = setDisplayCreateMode
    const [templates, setTemplates] = useState<Product[]>([])

    const handleRemove = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
        const { productId } = event.currentTarget.dataset
        currentProductId.current = productId
        openDeleteModal()
    }, [openDeleteModal])

    const handleRemoveProduct = useCallback(async () => {
        setIsSubmitting(true)

        const { status } = await ProductService.delete(currentProductId.current!)
        setIsSubmitting(false)
        if (status === 200) {
            refetchProducts()
            showToast(
                {
                    type: 'success',
                    title: "Thành công",
                    message: "Xoá sản phẩm thành công!"
                }
            )
            closeDeleteModal()
            return
        }
        showToast(
            {
                type: 'warning',
                title: "Thất bại",
                message: "Xoá sản phẩm thất bại."
            }
        )
    }, [refetchProducts, closeDeleteModal])


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
        const { productId } = event.currentTarget.dataset
        if (isEmpty(productId) || isUndefined(productId)) {
            currentProductId.current = undefined
            openCreateModal()
        } else {
            currentProductId.current = productId
            openCloneModal()
        }
        offDisplayCreateMode()
    }, [offDisplayCreateMode, openCloneModal, openCreateModal])

    const updateProduct = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        const { productId } = event.currentTarget.dataset
        currentProductId.current = productId
        openUpdateModal()
    }, [openUpdateModal])

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
                        disabled={loading}
                        onClick={refetchProducts}
                        className='disabled:opacity-50'
                    >
                        {
                            loading ? (
                                <Loading.Circle className='mr-1' size={16} />

                            ) : (
                                <ReloadIcon className='mr-1 h-4 w-4' />
                            )
                        }
                        <span>Sản phẩm</span>
                    </Button>
                    <Button
                        type='button'
                        variant="indigo"
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
                                className="h-20 p-2 flex items-center space-x-2 rounded border px-2 flex-none group overflow-x-hidden"
                            >
                                <div className='h-full aspect-square overflow-hidden flex items-center flex-none'>
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
                                <div className='space-y-2'>
                                    <button
                                        type='button'
                                        data-product-id={item.id}
                                        onClick={updateProduct}
                                        className='min-w-full px-1.5 py-0.5 rounded bg-gray-500 block w-fit flex-none text-xs font-medium text-white'
                                    >
                                        Chi tiết
                                    </button>
                                    <button
                                        type='button'
                                        onClick={handleRemove}
                                        data-product-id={item.id}
                                        className='min-w-full px-1.5 py-0.5 rounded bg-main-primary block w-fit flex-none text-xs font-medium text-white'
                                    >
                                        Xoá
                                    </button>
                                </div>
                            </li>
                        )
                    ) : (
                        <NoResult
                            className='col-span-2 space-y-2'
                            message={
                                (
                                    <p className='text-main-primary text-xs italic text-center'>Vui lòng thêm sản phẩm cho danh mục!</p>
                                )
                            }
                        />
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
                        data-product-id={null}
                    >
                        Hoặc tạo mới sản phẩm
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
                                                data-product-id={product.id}
                                                className='block w-fit px-1 rounded text-xs flex-none'
                                            >
                                                Chọn
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
                parentId={currentProductId.current!}
                refetchProducts={refetchProducts}
            />
            <CreateProduct
                menuId={menuId!}
                display={displayCreate}
                setDisplay={setDisplayCreate}
                refetchProducts={refetchProducts}
            />
            <UpdateProduct
                productId={currentProductId.current!}
                display={displayUpdate}
                setDisplay={setDisplayUpdate}
                refetchProducts={refetchProducts}
            />
            <Modal
                flag={displayDelete}
                closeModal={setDisplayDelete.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <div className='space-y-5'>
                    <p className="px-5 py-2 shadow border-b truncate font-medium">Xác nhận xoá sản phẩm</p>
                    <div className='space-y-5'>
                        <p className='px-5'><span className='font-medium text-red-500'>Xác nhận xoá.</span> Sản phẩm sẽ bị xoá.</p>
                        <div className="border-t py-2 px-5 flex justify-end space-x-5">
                            <Button
                                type="button"
                                variant="red"
                                onClick={handleRemoveProduct}
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
                                onClick={setDisplayDelete.off}
                            >
                                Huỷ
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default MenuProducts