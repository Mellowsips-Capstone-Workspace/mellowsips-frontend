import { isEmpty } from 'lodash'
import Loading from 'modules/Common/Loading'
import { Widget } from 'modules/Layout/Dashboard'
import Update from 'modules/Manager/components/UpdateMenu'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MenuService from 'services/MenuService'
import ProductService from 'services/ProductService'
import { Menu, MenuSection } from 'types/menus'
import { Product } from 'types/product'

const UpdateMenu = () => {
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [menu, setMenu] = useState<Menu>()

    const { id: menuId } = useParams()
    const navigate = useNavigate()


    const refetchProducts = useCallback(async () => {
        setFetching(true)
        const { status, body } = await ProductService.getMenuProducts(menuId!)
        setFetching(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data)) {
            setProducts(body.data)
        } else {
            setProducts([])
            return
        }

    }, [menuId])

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
                        ProductService.getMenuProducts(menuId!),
                        MenuService.getById(menuId!)
                    ]
                )

                setLoading(false)

                if (requestProducts.status === 200 && !isEmpty(requestProducts.body) && Array.isArray(requestProducts.body.data)) {
                    setProducts(requestProducts.body.data)
                } else {
                    setProducts([])
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
                        loading={fetching}
                        products={products}
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
                        refetchProducts={refetchProducts}
                    />
                ) : null
            }
        </Widget>
    )
}

export default UpdateMenu