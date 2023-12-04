import { Form, Formik } from "formik"
import { isArray, isEmpty } from "lodash"
import Button from "modules/Common/Button"
import FormikTextField from "modules/Common/FormikTextField"
import Loading from "modules/Common/Loading"
import MenuOptionSections from "modules/Common/Menu/MenuOptionSections"
import StoreSelect from "modules/Common/Store/StoreSelect"
import showToast from "modules/Common/Toast"
import { FC, useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import MenuService from "services/MenuService"
import ProductService from "services/ProductService"
import { Product } from "types/product"
import REGEX from "validations/regex"
import { array, object, string } from "yup"

const AddMenu: FC = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<Product[]>([])

    const refetch = useCallback(async () => {
        setLoading(true)

        const { status, body } = await ProductService.search({ pagination: { page: 1, offset: 1000 } })
        setLoading(false)

        if (status === 200 && !isEmpty(body) && Array.isArray(body.data.results)) {
            setProducts(body.data.results)
        } else {
            setProducts([])
        }
    }, [])

    useEffect(() => {
        refetch()
    }, [refetch])

    return (

        <Formik
            initialValues={
                {
                    name: "",
                    isActive: false,
                    menuSections: [
                        {
                            name: "",
                            productIds: []
                        }
                    ],
                    storeId: null,
                }
            }
            validationSchema={
                object(
                    {
                        name: string().matches(REGEX.notBlank, "Tên menu không hợp lệ.").required("Trường này không được để trống."),
                        storeId: string().required("Vui lòng chọn cửa hàng"),
                        menuSections: array(
                            object(
                                {
                                    name: string().matches(REGEX.notBlank, "Tên chưa hợp lệ.").required("Tên là bắt buộc"),
                                    productIds: array(string().required()).min(1, "Thêm ít nhất 1 sản phẩm vào danh mục")
                                }
                            )
                        ).min(1)
                    }
                )
            }
            onSubmit={
                async ({ menuSections, ...values }) => {
                    const payload = {
                        ...values,
                        menuSections: isArray(menuSections) ? menuSections.map(
                            (section: object, index) => (
                                {
                                    ...section,
                                    priority: index + 1
                                }
                            )
                        ) : []
                    }

                    const { body, status } = await MenuService.create(payload)
                    if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
                        showToast(
                            {
                                type: "error",
                                title: "Thất bại",
                                message: "Tạo menu thất bại."
                            }
                        )
                        return
                    }
                    showToast(
                        {
                            type: "success",
                            title: "Thành công",
                            message: "Tạo menu thành công."
                        }
                    )
                    navigate("/menus")
                }
            }
        >
            <Form className="w-full space-y-5">
                <div className="grid grid-cols-4 gap-5">
                    <div className="col-span-3 p-5 bg-white rounded shadow grid grid-cols-2 gap-5">

                        <div className="space-y-2">
                            <label className="text-gray-500 font-medium">Tên menu</label>
                            <FormikTextField.Input
                                name="name"
                                placeholder="Tên menu"
                            />
                        </div>
                        <StoreSelect />
                    </div>

                    <div className="col-span-1 p-5 grid grid-cols-2 gap-5 bg-white rounded shadow">

                        <div className="space-y-2">
                            <label className='text-gray-500 font-medium'>Hiển thị</label>
                            <FormikTextField.ToggleCheckbox name="isActive" />
                        </div>
                        <div className="space-y-2">
                            <Button
                                type="submit"
                                variant="indigo"
                                className="h-fit min-w-full"
                            >
                                Tạo Menu
                            </Button>
                            <Link
                                to="/menus"
                                className="block"
                            >
                                <Button
                                    className="min-w-full h-fit"
                                    type="button"
                                >
                                    Quay về
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                {
                    loading ? (
                        <div className="mx-auto space-y-4 p-5">
                            <Loading.Circle className="mx-auto text-main-primary" />
                            <p className="text-gray-500 text-center">Đang danh sách sản phẩm. Vui lòng đợi trong giây lát!</p>
                        </div>
                    ) : <MenuOptionSections refetch={refetch} products={products} />
                }
            </Form>
        </Formik>
    )
}

export default AddMenu