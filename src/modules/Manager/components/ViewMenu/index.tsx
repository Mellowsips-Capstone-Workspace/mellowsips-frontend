import { isArray } from "lodash"
import Badge from "modules/Common/Badge"
import DocumentPreview from 'modules/Common/Document'
import NoResult from "modules/Common/NoResult"
import { FC } from "react"
import { Menu } from "types/menus"

type ViewMenuProps = {
    menu: Menu
}

const ViewMenu: FC<ViewMenuProps> = ({ menu }) => {
    const { menuSections } = menu
    return (
        <div className="space-y-5">
            <div className="bg-white p-5 shadow rounded">
                <h2 className="font-medium text-lg flex justify-between items-center">
                    <span>{menu.name}</span>
                    {
                        menu.isActive ? (
                            <Badge className='text-xs px-0.5' intent="blue">Đang hoạt động</Badge>
                        ) : (
                            <Badge className='text-xs px-0.5' intent="red">Tạm ẩn</Badge>
                        )
                    }
                </h2>
            </div>
            <div className="bg-white p-5 space-y-5 shadow rounded">
                <h2 className="font-medium text-lg text-main-primary">Danh mục sản phẩm</h2>

                {
                    isArray(menuSections) && menuSections.length ? (

                        <div className="grid grid-cols-2 gap-5">
                            {
                                menuSections.map(
                                    ({ name, products }) => (
                                        <div className="border rounded p-5 space-y-2">
                                            <h2 className="font-medium">{name}</h2>

                                            {
                                                isArray(products) && products.length ? (
                                                    <ul className="grid grid-cols-2 gap-5">
                                                        {
                                                            products.map(
                                                                product => (
                                                                    <li
                                                                        key={product.id}
                                                                        className="h-16 p-1 flex items-center space-x-2 rounded border px-2 flex-none group overflow-x-hidden"
                                                                    >
                                                                        <div className='h-full aspect-square flex items-center flex-none overflow-hidden'>
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
                                                                    </li>
                                                                )
                                                            )
                                                        }
                                                    </ul>
                                                ) : <NoResult />
                                            }


                                        </div>
                                    )
                                )
                            }
                        </div>
                    ) : <NoResult />
                }

            </div>
        </div>


    )

}

export default ViewMenu