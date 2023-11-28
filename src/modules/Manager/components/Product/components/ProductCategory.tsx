import { Form, Formik, useFormikContext } from 'formik'
import useBoolean from 'hooks/useBoolean'
import { capitalize } from 'lodash'
import Button from 'modules/Common/Button'
import FormikTextField from 'modules/Common/FormikTextField'
import Modal from 'modules/Common/Modal/Modal'
import { FC, MouseEvent, useCallback, useEffect, useState } from 'react'
import { Product } from 'types/product'
import REGEX from 'validations/regex'
import { object, string } from 'yup'

type ProductCategoryModalProps = {
    flag: boolean
    closeModal: () => void
    categories: any[]
    setCategories: (categories: any[]) => void
    saveCategories: (categories: any[]) => void
}

const ProductCategoryModal: FC<ProductCategoryModalProps> = ({ flag, closeModal, categories, setCategories, saveCategories }) => {
    const [items, setItems] = useState<any[]>([])

    const remove = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        const index = parseInt(event.currentTarget.dataset.index!)
        setItems(
            items => {
                const categories = [...items]
                categories.splice(index, 1)

                return categories
            }
        )
    }, [])

    const handleSaveCategories = useCallback(() => {
        saveCategories(items)
        setCategories(items)
        closeModal()
    }, [items, closeModal, saveCategories, setCategories])

    useEffect(() => {
        setItems(categories)
    }, [categories])


    return (
        <Modal
            flag={flag}
            closeModal={closeModal}
            closeOutside={false}
            className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
            innerClassName="w-96 space-y-5 flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
        >
            <p className="px-5 py-2 shadow border-b truncate font-medium">Quản lý danh mục</p>

            <div className='px-5 space-y-5'>
                <Formik
                    initialValues={
                        {
                            name: ""
                        }
                    }
                    validationSchema={
                        object(

                            {
                                name: string().matches(REGEX.notBlank, "Tên danh mục không hợp lệ.").required("Tên danh mục là bắt buộc"),
                            }
                        )
                    }

                    onSubmit={

                        async ({ name }, helper) => {
                            const exist = items.find(category => category.trim().toLowerCase() === name.trim().toLowerCase())
                            helper.setFieldValue("name", "", false)
                            if (exist) {
                                return
                            }
                            setItems(items => [...items, capitalize(name)])
                        }
                    }
                >
                    {
                        () => (
                            <Form>

                                <div className='flex space-x-2'>
                                    <div className='grow'>
                                        <FormikTextField.Input sm={true} name='name' placeholder='Nhập tên danh mục' />
                                    </div>
                                    <Button
                                        type="submit"
                                        variant="orange"
                                        base="none"
                                        className="px-2 py-0.5 h-fit rounded disabled:hidden disabled:opacity-0 opacity-100 transition-all"
                                    >
                                        Thêm
                                    </Button>
                                </div>

                            </Form>
                        )
                    }

                </Formik>

                <ul className="flex flex-wrap gap-2">
                    {
                        items.map(
                            (item, index) => (
                                <li
                                    key={index}
                                    data-index={index}
                                    className="flex items-center space-x-1 rounded border px-2 flex-none group"
                                >
                                    <span>{item}</span>
                                    <button
                                        type='button'
                                        data-index={index}
                                        onClick={remove}
                                    >

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-red-500 cursor-pointer">
                                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                        </svg>
                                    </button>
                                </li>
                            )
                        )
                    }
                </ul>

            </div>
            <div className="border-t py-2 px-5 flex justify-end space-x-5">
                <Button
                    type="button"
                    variant="indigo"
                    onClick={handleSaveCategories}
                    className="disabled:hidden disabled:opacity-0 opacity-100 transition-all"
                >
                    Lưu
                </Button>
                <Button
                    type="button"
                    variant="default"
                    onClick={closeModal}
                >
                    Huỷ
                </Button>
            </div>

        </Modal >
    )
}

const ProductCategory: FC = () => {
    const { values, setFieldValue } = useFormikContext<Product>()
    const [items, setItems] = useState<any[]>(values.categories || [])
    const [display, { on, off }] = useBoolean(false)

    const remove = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        const index = parseInt(event.currentTarget.dataset.index!)
        setItems(
            items => {
                const categories = [...items]
                categories.splice(index, 1)
                setFieldValue("categories", categories, false)
                return categories
            }
        )
    }, [setFieldValue])

    const saveValues = useCallback((items: string[]) => {
        setFieldValue("categories", items, true)
    }, [setFieldValue])


    return (
        <div className='space-y-1'>
            <div className='flex space-x-2 justify-between'>
                <label className='text-gray-500 font-medium'>Thể loại</label>

                <Button
                    base="none"
                    type='button'
                    variant="indigo"
                    onClick={on}
                    className='px-2 py-0.5 text-xs rounded font-medium'
                >
                    Thêm
                </Button>

            </div>
            <ul className="flex flex-wrap gap-2">
                {
                    items.map(
                        (item, index) => (
                            <li
                                key={index}
                                data-index={index}
                                className="flex items-center space-x-1 rounded border px-2 flex-none group"
                            >
                                <span>{item}</span>
                                <button
                                    type='button'
                                    data-index={index}
                                    onClick={remove}
                                >

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-red-500 cursor-pointer">
                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                </button>
                            </li>
                        )
                    )
                }
            </ul>
            <ProductCategoryModal
                categories={items}
                flag={display}
                closeModal={off}
                saveCategories={saveValues}
                setCategories={setItems}
            />
        </div>
    )
}

export default ProductCategory