import { ReloadIcon } from '@radix-ui/react-icons'
import { useFormikContext } from 'formik'
import useBoolean from 'hooks/useBoolean'
import Button from 'modules/Common/Button'
import DocumentPreview from 'modules/Common/Document'
import Modal from 'modules/Common/Modal/Modal'
import NoResult from 'modules/Common/NoResult'
import { FC, MouseEvent, memo, useCallback, useMemo, useState } from 'react'
import { Menu } from 'types/menus'
import { Product } from 'types/product'

type SelectProductsProps = {
    name: string
    products: Product[]
    originalName: string
    index: number
    refetchProducts: () => void
}

const SelectProducts: FC<SelectProductsProps> = ({ products, name, originalName, index, refetchProducts }) => {
    const { values, setFieldValue } = useFormikContext<Menu>()
    const [display, setDisplay] = useBoolean(false)
    const { storeId } = values
    const productIds = values[originalName].at(index).productIds as string[]

    const [items, setItems] = useState<(Product & { selected: boolean })[]>(
        () => {
            let items = products.map(product => ({ ...product, selected: false }))
            if (storeId) {
                items = items.filter(product => product.storeId === storeId)
            }
            return items.map(
                product => (
                    {
                        ...product,
                        selected: productIds.includes(product.id!)
                    }
                )
            )
        }
    )

    const setStateItem = useCallback((event: MouseEvent<HTMLLIElement | HTMLButtonElement>) => {
        const { id, state } = event.currentTarget.dataset

        setItems(
            items => items.map(
                item => {
                    if (item.id !== id) {
                        return item
                    }

                    return {
                        ...item,
                        selected: state === "true" ? true : false
                    }
                }
            )
        )
    }, [])

    const remove = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setFieldValue(name, productIds.filter((id) => id !== event.currentTarget.dataset.id), true)
    }, [setFieldValue, name, productIds])

    const handleSaveProduct = () => {
        setFieldValue(name, items.filter(({ selected }) => selected).map(({ id }) => id), true)
    }

    const selectedProducts = useMemo(() => {
        return items.filter(({ id }) => productIds.includes(id!))
    }, [items, productIds])


    return (
        <div className='space-y-2' key={name}>
            <div className="space-y-1 flex justify-between">
                <label className='text-gray-500 font-medium'>Sản phẩm</label>
                <div className='flex space-x-4'>
                    <Button
                        variant="default"
                        base="none"
                        type='button'
                        onClick={refetchProducts}
                        className='px-2 py-0.5 text-xs rounded font-medium'
                    >
                        <ReloadIcon className='mr-1 h-3 w-3' />
                        <span>Sản phẩm</span>
                    </Button>
                    <Button
                        variant="indigo"
                        base="none"
                        type='button'
                        onClick={setDisplay.on}
                        className='px-2 py-0.5 text-xs rounded font-medium'
                    >
                        Chọn
                    </Button>
                </div>
            </div>
            <ul className="py-2 grid grid-cols-2 gap-2">
                {
                    selectedProducts.length ? selectedProducts.map(
                        (item, index) => (
                            <li
                                key={index}
                                className="h-16 p-1 flex items-center space-x-2 rounded border px-2 flex-none group overflow-x-hidden"
                            >
                                <div className='h-full aspect-square flex items-center flex-none overflow-hidden'>
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
                                <button
                                    type='button'
                                    data-id={item.id}
                                    onClick={remove}
                                    className='block w-fit flex-none'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-red-500 cursor-pointer">
                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                </button>
                            </li>
                        )
                    ) : (
                        <p className='col-span-2 text-main-primary text-xs italic text-center'>Vui lòng thêm sản phẩm cho danh mục!</p>
                    )
                }
            </ul>
            <Modal
                flag={display}
                closeModal={setDisplay.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 p-5 flex items-center"
                innerClassName="w-220 space-y-5 flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <p className="px-5 py-2 shadow border-b truncate font-medium">Chọn sản phẩm</p>

                <div className='px-5 space-y-5'>
                    <ul className="grid grid-cols-2 gap-2">
                        {
                            items.length ? items.map(
                                (item, index) => (
                                    <li
                                        key={index}
                                        className="h-16 p-1 flex items-center space-x-2 rounded border px-2 flex-none group overflow-x-hidden"
                                    >
                                        <div className='h-full aspect-square flex items-center flex-none overflow-hidden'>
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
                                        {
                                            item.selected ? (
                                                <Button
                                                    variant="red"
                                                    base="none"
                                                    type='button'
                                                    data-id={item.id}
                                                    data-state={false}
                                                    onClick={setStateItem}
                                                    className='block w-fit px-1 rounded text-xs flex-none'
                                                >
                                                    Bỏ chọn
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="indigo"
                                                    base="none"
                                                    type='button'
                                                    data-id={item.id}
                                                    data-state={true}
                                                    onClick={setStateItem}
                                                    className='block w-fit px-1 rounded text-xs flex-none'
                                                >
                                                    Chọn
                                                </Button>
                                            )
                                        }
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
                </div>
                <div className="border-t py-2 px-5 flex justify-end space-x-5">
                    <Button
                        type="button"
                        variant="indigo"
                        onClick={handleSaveProduct}
                        className="disabled:hidden disabled:opacity-0 opacity-100 transition-all"
                    >
                        Lưu
                    </Button>
                    <Button
                        type="button"
                        variant="default"
                        onClick={setDisplay.off}
                    >
                        Huỷ
                    </Button>
                </div>
            </Modal >
        </div>
    )
}

export default memo(SelectProducts)