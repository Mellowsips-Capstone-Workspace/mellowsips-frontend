import { Form, Formik } from "formik"
import { isArray, isEmpty } from "lodash"
import Button from "modules/Common/Button"
import FormikTextField from "modules/Common/FormikTextField"
import UpdateMenuOptionSections from "modules/Common/Menu/UpdateMenuOptionSections"
import StoreSelect from "modules/Common/Store/StoreSelect"
import showToast from "modules/Common/Toast"
import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import MenuService from "services/MenuService"
import { Menu } from "types/menus"
import { Product } from "types/product"
import REGEX from "validations/regex"
import { array, object, string } from "yup"

type UpdateMenuProps = {
    products: Product[]
    menu: Menu
    refetchProducts: () => void
}

const UpdateMenu: FC<UpdateMenuProps> = ({ menu, products, refetchProducts }) => {
    const navigate = useNavigate()
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
                                className="h-fit min-w-full"
                            >
                                Lưu Menu
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
                <UpdateMenuOptionSections
                    products={products}
                    refetchProducts={refetchProducts}
                />
            </Form>
        </Formik>
    )
}

export default UpdateMenu