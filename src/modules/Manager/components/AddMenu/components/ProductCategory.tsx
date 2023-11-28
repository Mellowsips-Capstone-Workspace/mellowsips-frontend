import { useFormikContext } from 'formik'
import Button from 'modules/Common/Button'
import { FC, MouseEvent, useCallback, useState } from 'react'
import { Product } from 'types/product'

const ProductCategory: FC = () => {
    const { values, setFieldValue } = useFormikContext<Product>()
    const [items, setItems] = useState(values.categories)

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
    return (
        <div className='space-y-1'>
            <label className='text-gray-500 font-medium'>Thể loại</label>
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
                <Button
                    variant="indigo"
                    base="none"
                    className='px-2 py-0.5 text-xs rounded font-medium'
                >
                    Thêm
                </Button>
            </ul>
        </div>
    )
}

export default ProductCategory