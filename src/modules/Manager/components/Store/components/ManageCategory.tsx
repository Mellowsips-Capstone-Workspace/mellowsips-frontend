import Button from 'modules/Common/Button'
import showToast from 'modules/Common/Toast'
import { FC, MouseEvent, useCallback, useState } from 'react'

const ManageCategory: FC = () => {
    const [items, setItems] = useState(["Sữa chua", "Đá xay", "Trà sữa", "Đá xay", "Nước"])

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

    const onClick = () => {
        showToast(
            {
                type: "warning",
                title: "Thông báo",
                message: "Tính năng này chưa được hoàn thiện. Tính năng sẽ sớm có mặt."
            }
        )
    }

    return (
        <div className='space-y-5 bg-white p-5 w-full rounded hidden'>
            <div className='flex space-x-2 justify-between'>
                <h2 className='text-main-primary font-medium text-lg'>Danh mục nổi bật</h2>
                <div className="space-x-2">
                    <Button
                        type="button"
                        variant="default"
                        className="text-xs"
                        onClick={onClick}
                    >
                        Đặt lại
                    </Button>
                    <Button
                        type="button"
                        variant="orange"
                        className="text-xs"
                        onClick={onClick}
                    >
                        Lưu thay đổi
                    </Button>
                </div>

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
                <Button
                    variant="indigo"
                    base="none"
                    className='px-2 py-0.5 text-xs rounded font-medium'
                    onClick={onClick}
                >
                    Thêm
                </Button>
            </ul>
        </div>
    )
}

export default ManageCategory