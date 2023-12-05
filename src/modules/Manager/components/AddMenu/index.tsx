import ROLE from "enums/role"
import { Form, Formik } from "formik"
import useBoolean from "hooks/useBoolean"
import { isEmpty } from "lodash"
import Button from "modules/Common/Button"
import FormikTextField from "modules/Common/FormikTextField"
import Loading from "modules/Common/Loading"
import Modal from "modules/Common/Modal/Modal"
import StoreSelect from "modules/Common/Store/StoreSelect"
import showToast from "modules/Common/Toast"
import { FC, useId } from "react"
import { useNavigate } from "react-router-dom"
import MenuService from "services/MenuService"
import { useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"
import { MenuSection } from "types/menus"
import REGEX from "validations/regex"
import { object, string } from "yup"

type AddMenuProps = {
    refetch: () => void
}

const AddMenu: FC<AddMenuProps> = () => {
    const [display, setDisplay] = useBoolean(false)
    const principle = useAppSelector<Principle>(state => state.authenticate.principle!)
    const id = useId()


    const navigate = useNavigate()

    return (
        <>
            <Button type="button" variant="primary" onClick={setDisplay.on}>Thêm mới </Button>
            <Modal
                flag={display}
                closeModal={setDisplay.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-5 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >

                <Formik
                    initialValues={
                        {
                            name: "",
                            menuSections: null,
                            storeId: principle.type === ROLE.OWNER ? null : principle.storeId,
                        }
                    }
                    validationSchema={
                        object(
                            {
                                name: string().matches(REGEX.notBlank, "Tên menu không hợp lệ.").required("Trường này không được để trống."),
                                storeId: principle.type !== ROLE.OWNER ? string().nullable() : string().required("Vui lòng chọn cửa hàng.")
                            }
                        )
                    }
                    onSubmit={
                        async (values) => {
                            const menuSections = values.menuSections! as MenuSection[]
                            const payload = {
                                ...values,
                                menuSections: Array.isArray(menuSections) ? menuSections.map(
                                    (section: any, index) => (
                                        {
                                            ...section,
                                            priority: index + 1
                                        } as MenuSection
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
                            navigate("/menus/".concat(body.data.id!))
                        }
                    }
                >
                    {
                        ({ isSubmitting }) => (
                            <>
                                <p className="px-5 flex-none py-2 shadow border-b truncate font-medium">Tạo mới menu</p>

                                <Form
                                    id={id}
                                    className="p-5 grid grid-cols-2 gap-5 grow overflow-y-auto w-220"
                                >
                                    <div className="space-y-2">
                                        <label className="text-gray-500 font-medium">Tên menu</label>
                                        <FormikTextField.Input
                                            name="name"
                                            placeholder="Tên menu"
                                        />
                                    </div>
                                    {
                                        principle.type !== ROLE.OWNER ? null : <StoreSelect />
                                    }
                                </Form>
                                <div className="border-t py-2 px-5 flex justify-end space-x-5">
                                    <Button
                                        disabled={isSubmitting}
                                        form={id}
                                        type="submit"
                                        variant="primary"
                                        className="space-x-2"
                                    >
                                        {isSubmitting ? <Loading.Circle size={12} /> : null}
                                        <span>Tạo menu</span>
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="default"
                                        onClick={setDisplay.off}
                                    >
                                        Huỷ
                                    </Button>
                                </div>
                            </>
                        )
                    }
                </Formik>
            </Modal>
        </>

    )
}

export default AddMenu