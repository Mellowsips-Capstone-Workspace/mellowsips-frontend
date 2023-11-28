import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import { FieldArray, FieldArrayRenderProps } from 'formik'
import { isNull, isUndefined } from 'lodash'
import Button from 'modules/Common/Button'
import FormikTextField from 'modules/Common/FormikTextField'
import SelectProducts from 'modules/Manager/components/Menu/components/SelectProducts'
import { nanoid } from 'nanoid'
import { FC, useCallback, useRef } from 'react'
import { Menu, MenuSection } from 'types/menus'
import { Product } from 'types/product'

const Sections: FC<(void | FieldArrayRenderProps) & { products: Product[] }> = ({ products, ...props }) => {
    const currentMenuSections = useRef<MenuSection[] | null>(null)
    const { form, swap, push, name, remove } = props as FieldArrayRenderProps
    const { menuSections } = form.values as Menu
    currentMenuSections.current = menuSections
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
        <div
            key={name}
            className="bg-white p-5 rounded space-y-5"
        >

            <h2 className='font-medium text-lg text-main-primary space-x-1'>
                <span>Danh mục sản phẩm</span>
                {
                    menuSections.length === 0 ? (
                        <span>(Thêm ít nhất 1 danh mục)</span>
                    ) : null
                }
            </h2>

            <ul className="grid grid-cols-2 gap-x-10 gap-y-5">
                {
                    menuSections.map(
                        (item: MenuSection, index) => (
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

                                        <div className="space-y-1">
                                            <label className='text-gray-500 font-medium'>Tên danh mục</label>
                                            <FormikTextField.Input name={`${name}.${index}.name`} />
                                        </div>

                                        <SelectProducts index={index} originalName={name} key={nanoid()} products={products} name={`${name}.${index}.productIds`} />
                                    </div>
                                    <DragHandleDots2Icon className="cursor-move" />
                                </div>
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
                            productIds: []
                        }
                    )
                }
            >
                Thêm danh mục mới
            </button>
        </div>
    )
}

type UpdateMenuOptionSectionsProps = {
    products: Product[]
}
const UpdateMenuOptionSections: FC<UpdateMenuOptionSectionsProps> = ({ products }) => (
    <FieldArray
        name="menuSections"
        key="menuSections"
        render={(props) => <Sections {...props} products={products} />}
    />
)

export default UpdateMenuOptionSections