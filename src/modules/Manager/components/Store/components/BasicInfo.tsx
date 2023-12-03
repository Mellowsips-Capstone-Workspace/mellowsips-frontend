import ROLE from "enums/role"
import { Form, Formik } from "formik"
import useBoolean from "hooks/useBoolean"
import { isEmpty } from "lodash"
import Button from "modules/Common/Button"
import DocumentPreview from "modules/Common/Document"
import UploadFile from "modules/Common/FormikTextField/UploadFile"
import Modal from "modules/Common/Modal/Modal"
import showToast from "modules/Common/Toast"
import { StoreContext, StoreContextType } from "modules/Manager/components/Store/contexts/StoreContext"
import { FC, useContext } from "react"
import StoreService from "services/StoreService"
import { useAppSelector } from "stores/root"
import { object, string } from "yup"

const CoverImage: FC = () => {
    const { store, updateStore } = useContext<StoreContextType>(StoreContext)!
    const [display, { on, off }] = useBoolean(false)

    return (
        <div
            className="h-60 relative"

        >
            {
                store.coverImage ? (
                    <div className="absolute w-full h-full overflow-hidden">
                        <DocumentPreview
                            displayFileName={false}
                            loadingMessage={false}
                            documentId={store.coverImage}
                        />

                    </div>
                ) : null
            }
            <button
                type="button"
                onClick={on}
                className="absolute flex space-x-1 bottom-5 right-5 bg-black/90 text-white px-3 rounded py-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                <span>Thay đổi ảnh nền</span>
            </button>

            <Modal
                flag={display}
                closeModal={on}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-5 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <p className="flex-none px-5 py-2 shadow border-b truncate font-medium">Thay đổi ảnh nền</p>

                <Formik
                    initialValues={
                        {
                            coverImage: store.coverImage
                        }
                    }
                    validationSchema={
                        object(
                            {
                                coverImage: string().required("Tên đăng nhập là bắt buộc")
                            }
                        )
                    }
                    onSubmit={
                        async (values) => {

                            const { status, body } = await StoreService.updateFieldStore(
                                store.id,
                                "cover-image",
                                {
                                    coverImage: values.coverImage
                                }
                            )


                            if (status === 200 && !isEmpty(body)) {
                                off()
                                showToast(
                                    {
                                        type: "success",
                                        title: "Thành công",
                                        message: "Cập nhật ảnh nền."
                                    }
                                )
                                updateStore(
                                    "coverImage",
                                    values.coverImage
                                )
                                return
                            }

                            showToast(
                                {
                                    type: "warning",
                                    title: "Thất bại",
                                    message: "Cập nhật ảnh nền thất bại."
                                }
                            )
                        }
                    }
                >
                    {
                        ({ values: { coverImage }, resetForm }) => (
                            <>
                                <Form
                                    className="p-5 space-y-5 grow overflow-y-auto"
                                    id={store.id}
                                >

                                    {
                                        isEmpty(coverImage) ? (
                                            <UploadFile
                                                accept="image/*"
                                                maxAllowedSize={10}
                                                name="coverImage"
                                            />
                                        ) : (
                                            <div className="pointer-events-none">
                                                <DocumentPreview
                                                    documentId={coverImage}
                                                    displayFileName={false}
                                                    loadingMessage={false}
                                                />
                                            </div>
                                        )
                                    }

                                </Form>
                                <div className="flex-none border-t py-2 px-5 flex justify-end space-x-5">
                                    {
                                        isEmpty(coverImage) ? null : (
                                            <Button
                                                form={store.id}
                                                type="submit"
                                                variant="indigo"
                                            >
                                                Lưu thay đổi
                                            </Button>

                                        )
                                    }
                                    <Button
                                        type="button"
                                        variant="secondary"

                                        onClick={
                                            () => resetForm({ values: { coverImage: "" } })
                                        }
                                    >
                                        Chọn ảnh khác
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="default"
                                        onClick={off}
                                    >
                                        Đóng
                                    </Button>
                                </div>
                            </>
                        )
                    }
                </Formik>


            </Modal>
        </div>
    )
}

const AvatarImage: FC = () => {
    const { store, updateStore } = useContext<StoreContextType>(StoreContext)!
    const [display, { on, off }] = useBoolean(false)

    return (
        <>

            <div
                className="h-14 w-14 overflow-hidden flex items-center justify-center relative cursor-pointer"
                onClick={on}
            >
                {
                    isEmpty(store.profileImage) ? (
                        <div className="h-full w-full flex items-center justify-center rounded bg-main-primary text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg>

                        </div>
                    ) : (
                        <div className="pointer-events-none">
                            <DocumentPreview
                                documentId={store.profileImage}
                                loadingMessage={false}
                                displayFileName={false}
                            />
                        </div>
                    )
                }
            </div>

            <Modal
                flag={display}
                closeModal={on}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-5 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <p className="flex-none px-5 py-2 shadow border-b truncate font-medium">Thay đổi ảnh nền</p>

                <Formik
                    initialValues={
                        {
                            profileImage: store.profileImage
                        }
                    }
                    validationSchema={
                        object(
                            {
                                profileImage: string().required("Tên đăng nhập là bắt buộc")
                            }
                        )
                    }
                    onSubmit={
                        async (values) => {

                            const { status, body } = await StoreService.updateFieldStore(
                                store.id,
                                "profile-image",
                                {
                                    profileImage: values.profileImage
                                }
                            )


                            if (status === 200 && !isEmpty(body)) {
                                off()
                                showToast(
                                    {
                                        type: "success",
                                        title: "Thành công",
                                        message: "Cập nhật ảnh đại diện."
                                    }
                                )
                                updateStore(
                                    "profileImage",
                                    values.profileImage
                                )
                                return
                            }

                            showToast(
                                {
                                    type: "warning",
                                    title: "Thất bại",
                                    message: "Cập nhật ảnh đại diện thất bại."
                                }
                            )
                        }
                    }
                >
                    {
                        ({ values: { profileImage }, resetForm }) => (
                            <>
                                <Form
                                    className="p-5 space-y-5 grow overflow-y-auto"
                                    id={store.id}
                                >

                                    {
                                        isEmpty(profileImage) ? (
                                            <UploadFile
                                                accept="image/*"
                                                maxAllowedSize={10}
                                                name="profileImage"
                                            />
                                        ) : (
                                            <div className="pointer-events-none">
                                                <DocumentPreview
                                                    documentId={profileImage}
                                                    displayFileName={false}
                                                    loadingMessage={false}
                                                />
                                            </div>
                                        )
                                    }

                                </Form>
                                <div className="flex-none border-t py-2 px-5 flex justify-end space-x-5">
                                    {
                                        isEmpty(profileImage) ? null : (
                                            <Button
                                                form={store.id}
                                                type="submit"
                                                variant="indigo"
                                            >
                                                Lưu thay đổi
                                            </Button>

                                        )
                                    }
                                    <Button
                                        type="button"
                                        variant="secondary"

                                        onClick={
                                            () => resetForm({ values: { profileImage: "" } })
                                        }
                                    >
                                        Chọn ảnh khác
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="default"
                                        onClick={off}
                                    >
                                        Đóng
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

const BasicInfo: FC = () => {
    const { store } = useContext<StoreContextType>(StoreContext)!
    const { type } = useAppSelector(state => state.authenticate.principle!)

    return (
        <div
            aria-disabled={type === ROLE.STAFF}
            className="shadow rounded aria-disabled:pointer-events-none"
        >
            <CoverImage />

            <div className="bg-white rounded-b px-5 py-2 space-y-3">
                <div className="flex">
                    <div className="grow flex space-x-5 items-center relative">
                        <AvatarImage />
                        <div className="grow">

                            <h2 className="text-lg font-semibold">{store.name}</h2>
                            <span className="text-xs px-1 py-0.5 rounded text-white bg-green-500">Đang mở cửa</span>

                        </div>
                    </div>

                    <Button
                        type="button"
                        className="h-fit space-x-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>

                        <span>Cập nhật thông tin</span>

                    </Button>

                </div>

                <div className="space-y-1">
                    <h3 className="font-medium">Thông tin quán</h3>
                    <div className="flex items-center space-x-1">
                        <span className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                        </span>
                        <span className="text-gray-500">{store.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </span>
                        <span className="text-gray-500">{store.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                        </span>
                        <span className="text-gray-500">{store.address}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasicInfo