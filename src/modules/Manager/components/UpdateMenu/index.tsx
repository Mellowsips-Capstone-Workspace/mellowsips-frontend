import { Form, Formik } from "formik"
import { isArray, isEmpty } from "lodash"
import Button from "modules/Common/Button"
import FormikTextField from "modules/Common/FormikTextField"
import Loading from "modules/Common/Loading"
import StoreSelect from "modules/Common/Store/StoreSelect"
import showToast from "modules/Common/Toast"
import MenuProducts from "modules/Manager/components/UpdateMenu/MenuProducts"
import UpdateMenuOptionSections from "modules/Manager/components/UpdateMenu/UpdateMenuOptionSections"
import { FC } from "react"
import { Link } from "react-router-dom"
import MenuService from "services/MenuService"
import { Menu, MenuSection } from "types/menus"
import { Product } from "types/product"
import REGEX from "validations/regex"
import { array, object, string } from "yup"

type UpdateMenuProps = {
    loading: boolean
    products: Product[]
    menu: Menu
    refetchProducts: () => void
}

const UpdateMenu: FC<UpdateMenuProps> = ({ menu, products, refetchProducts, loading }) => {

    return (
        <Formik
            initialValues={
                {
                    ...menu,
                    isActive: menu.isActive ? true : false
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
                    const ids = products.map(({ id }) => id)
                    const payload = {
                        ...values,
                        menuSections: isArray(menuSections) ? menuSections.map(
                            (section: MenuSection, index) => (
                                {
                                    ...section,
                                    priority: index + 1,
                                    productIds: section.productIds.filter(id => ids.includes(id))
                                }
                            )
                        ) : []
                    }

                    const { body, status } = await MenuService.update(menu.id!, payload)
                    if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
                        showToast(
                            {
                                type: "error",
                                title: "Thất bại",
                                message: "Cập nhật menu thất bại."
                            }
                        )
                        return
                    }
                    showToast(
                        {
                            type: "success",
                            title: "Thành công",
                            message: "Cập nhật menu thành công."
                        }
                    )
                }
            }
        >
            {
                ({ isSubmitting }) => (
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
                                <div className="opacity-80 cursor-not-allowed">
                                    <div className="pointer-events-none">
                                        <StoreSelect />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 p-5 grid grid-cols-2 gap-5 bg-white rounded shadow">

                                <div className="space-y-2">
                                    <label className='text-gray-500 font-medium'>Kích hoạt</label>
                                    <FormikTextField.ToggleCheckbox name="isActive" />
                                </div>
                                <div className="space-y-2">
                                    <Button
                                        type="submit"
                                        variant="indigo"
                                        disabled={isSubmitting}
                                        className="h-fit min-w-full disabled:opacity-50"
                                    >
                                        {
                                            isSubmitting ? (
                                                <Loading.Circle className="mr-2" size={14} />
                                            ) : null
                                        }
                                        <span>Lưu Menu</span>
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
                        <div className="bg-white p-5 space-y-5 rounded border">
                            <MenuProducts
                                products={products}
                                loading={loading}
                                refetchProducts={refetchProducts}
                                storeId={menu.storeId!}
                            />
                        </div>
                        <div className="rounded border">
                            <UpdateMenuOptionSections
                                products={products}
                                refetchProducts={refetchProducts}
                            />
                        </div>
                    </Form>
                )
            }
        </Formik>
    )
}

export default UpdateMenu