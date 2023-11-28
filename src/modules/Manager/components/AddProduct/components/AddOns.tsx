import { FieldArrayRenderProps } from 'formik'
import Button from 'modules/Common/Button'
import FormikTextField from 'modules/Common/FormikTextField'
import { FC } from 'react'
import { Product } from 'types/product'

const AddOns: FC<void | FieldArrayRenderProps> = (props) => {
    const { form, name, remove, push } = props as FieldArrayRenderProps
    const { productOptionSections } = form.values as Product
    const addons = productOptionSections.at(parseInt(name.split(".").at(1)!))!.productAddons

    return (
        <div className='border-t'>
            <ul>
                {
                    addons.map(
                        (addon, index) => (
                            <li
                                key={index}
                                className='border-b last:border-b-0'
                            >
                                <div
                                    className='flex space-x-2 px-5 py-2'
                                >
                                    <div
                                        className='grow grid grid-cols-3 gap-5'
                                    >
                                        <FormikTextField.Input
                                            name={`${name}.${index}.name`}
                                            placeholder='Tên lựa chọn'
                                        />
                                        <FormikTextField.NumberInput
                                            name={`${name}.${index}.price`}
                                            placeholder='Giá lựa chọn'

                                        />

                                        <div className="space-y-1">
                                            <label className='text-gray-500 font-medium'>Trạng thái</label>
                                            <div className='flex space-x-2'>
                                                <FormikTextField.ToggleCheckbox name={`${name}.[${index}].isSoldOut`} />
                                                {
                                                    addon.isSoldOut ? (
                                                        <span className='bg-slate-200 px-1 rounded text-xs font-medium'>Tạm hết</span>
                                                    ) : (
                                                        <span className='bg-green-500 text-white px-1 rounded text-xs font-medium'>Có sẵn</span>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <button type='button' className='text-main-primary flex-none' onClick={() => remove(index)} >Loại bỏ</button>
                                </div>
                            </li>
                        )
                    )
                }

            </ul>
            <div className='p-5'>
                <Button
                    className='block w-full'
                    type='button'
                    onClick={
                        () => push(
                            {
                                name: "",
                                price: 0,
                                isSoldOut: false
                            }
                        )
                    }
                >
                    Thêm lựa chọn
                </Button>
            </div>
        </div>
    )
}

export default AddOns