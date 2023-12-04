import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import { FieldArray, FieldArrayRenderProps } from 'formik'
import { isNull, isUndefined } from 'lodash'
import Button from 'modules/Common/Button'
import FormikTextField from 'modules/Common/FormikTextField'
import AddOns from 'modules/Common/Product/AddOns'
import { FC, useCallback, useRef } from 'react'
import { Product, ProductOptionSection } from 'types/product'

const Sections: FC<void | FieldArrayRenderProps> = (props) => {

    const { form, swap, push, name, remove } = props as FieldArrayRenderProps
    const { productOptionSections } = form.values as Product
    const position = useRef({ pick: -1, target: -1 })
    const handleSwap = useCallback((index: number, targetIndex: number) => {
        if (position.current.pick === -1 || position.current.target === -1 || index === targetIndex) {
            return
        }

        swap(index, targetIndex)
    }, [swap])

    const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
        position.current = {
            ...position.current,
            pick: parseInt(event.currentTarget.dataset.index!)
        }
    }

    const handleDragOver = useCallback((event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault()
        position.current = {
            ...position.current,
            target: parseInt(event.currentTarget.dataset.index!)
        }
    }, [])

    const handleDragEnd = useCallback(() => {
        handleSwap(position.current.pick, position.current.target)
        position.current = { pick: -1, target: -1 }
    }, [handleSwap])

    if (isNull(props) || isUndefined(props)) {
        return
    }

    return (
        <div className="bg-white p-5 rounded space-y-5">
            <h2 className='font-medium text-lg text-main-primary'>Nhóm sản phẩm tuỳ chọn</h2>

            <ul className="grid grid-cols-2 gap-x-10 gap-y-5">
                {
                    productOptionSections.map(
                        (item: ProductOptionSection, index) => (
                            <li
                                draggable
                                key={index}
                                data-index={index}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDragStart={handleDragStart}
                                className="border rounded bg-white"
                            >
                                <div className='flex p-5 space-x-5 justify-between items-start'>
                                    <div className='grow space-y-5'>

                                        <div className='grid gap-5 grid-cols-2 items-start'>
                                            <div className="space-y-1">
                                                <label className='text-gray-500 font-medium'>Tên nhóm sản phẩm tuỳ chọn</label>
                                                <FormikTextField.Input name={`${name}.${index}.name`} />
                                            </div>
                                            <div
                                                className="space-y-1"
                                            >
                                                <label className='text-gray-500 font-medium'>Tối đa lựa chọn</label>
                                                <FormikTextField.Input name={`${name}.${index}.maxAllowedChoices`} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className='text-gray-500 font-medium'>Tuỳ chọn bắt buộc</label>
                                                <div className='flex space-x-2'>
                                                    <FormikTextField.ToggleCheckbox name={`${name}.${index}.isRequired`} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <DragHandleDots2Icon className="cursor-move" />
                                </div>

                                <FieldArray
                                    name={`${name}.${index}.productAddons`}
                                    component={AddOns}
                                />
                                <hr></hr>
                                <div className='p-5'>
                                    <Button
                                        className='block w-full bg-main-primary text-white'
                                        type='button'
                                        onClick={
                                            () => remove(index)
                                        }
                                    >
                                        Loại bỏ nhóm
                                    </Button>
                                </div>
                            </li>
                        )
                    )
                }
            </ul>

            <button
                className='block w-full bg-indigo-500 text-white rounded py-1'
                type='button'
                onClick={
                    () => push(
                        {
                            name: "",
                            priority: productOptionSections.length,
                            isRequired: false,
                            maxAllowedChoices: 1,
                            productAddons: []
                        }
                    )
                }
            >
                Thêm nhóm mới
            </button>
        </div>
    )

}

const ProductOptionSections: FC = () => (
    <FieldArray
        name="productOptionSections"
        component={Sections}
    />
)

export default ProductOptionSections