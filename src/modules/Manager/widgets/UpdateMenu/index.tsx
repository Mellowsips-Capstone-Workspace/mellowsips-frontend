import { isEmpty } from 'lodash'
import Loading from 'modules/Common/Loading'
import { Widget } from 'modules/Layout/Dashboard'
import Update from 'modules/Manager/components/UpdateMenu'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MenuService from 'services/MenuService'
import ProductService from 'services/ProductService'
import { Menu, MenuSection } from 'types/menus'
import { Product } from 'types/product'

const UpdateMenu = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [menu, setMenu] = useState<Menu>()

    const { id: menuId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        if (isEmpty(menuId)) {
            navigate("/menus")
            return
        }

        (
            async () => {
                setLoading(true)

                const [requestProducts, requestMenu] = await Promise.all(
                    [
                        ProductService.search({ pagination: { page: 1, offset: 1000 } }),
                        MenuService.getById(menuId!)
                    ]
                )

                setLoading(false)

                if (requestProducts.status === 200 && !isEmpty(requestProducts.body) && Array.isArray(requestProducts.body.data.results)) {
                    setProducts(requestProducts.body.data.results)
                } else {
                    navigate("/menus")
                    return
                }

                if (requestMenu.status === 200 && !isEmpty(requestMenu.body)) {

                    setMenu(requestMenu.body.data)
                } else {
                    navigate("/menus")
                    return
                }
            }
        )()
    }, [menuId, navigate])


    return (
        <Widget>
            {
                loading ? (
                    <div className="mx-auto space-y-4 p-5">
                        <Loading.Circle className="mx-auto text-main-primary" />
                        <p className="text-gray-500 text-center">Đang chuẩn bị tài nguyên. Vui lòng đợi trong giây lát!</p>
                    </div>
                ) : (menu && products) ? (
                    <Update
                        menu={
                            {
                                ...menu,
                                menuSections: Array.isArray(menu.menuSections) ? menu.menuSections.sort(
                                    (first, second) => {
                                        if (first.priority === second.priority) {
                                            return 1
                                        }
                                        return first.priority < second.priority ? -1 : 1
                                    }
                                ).map(
                                    (section: MenuSection) => (
                                        {
                                            ...section,
                                            productIds: section.products.map(({ id }) => id!)
                                        }
                                    )
                                ) : []
                            }
                        }
                        products={products}
                    />
                ) : null
            }
        </Widget>
    )
}

export default UpdateMenu