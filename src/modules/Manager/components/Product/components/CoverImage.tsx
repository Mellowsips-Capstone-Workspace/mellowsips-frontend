import { useFormikContext } from "formik"
import useBoolean from "hooks/useBoolean"
import { isEmpty } from "lodash"
import Button from "modules/Common/Button"
import DocumentPreview from "modules/Common/Document"
import UploadFile from "modules/Common/FormikTextField/UploadFile"
import Modal from "modules/Common/Modal/Modal"
import { FC } from "react"

const CoverImage: FC = () => {
    const [display, { on, off }] = useBoolean(false)
    const { setFieldValue, values: { coverImage } } = useFormikContext<{ coverImage: string }>()

    return (
        <div
            className="h-40 w-40 overflow-hidden flex items-center justify-center relative cursor-pointer"
            onClick={on}
        >
            {
                isEmpty(coverImage) ? (
                    <div className="h-full w-full flex items-center justify-center rounded bg-main-primary text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                    </div>
                ) : (
                    <div className="pointer-events-none">
                        <DocumentPreview
                            documentId={coverImage}
                            loadingMessage={false}
                            displayFileName={false}
                        />
                    </div>
                )
            }
            <Modal
                flag={display}
                closeModal={on}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-5 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <p className="flex-none px-5 py-2 shadow border-b truncate font-medium">Thay đổi ảnh nền</p>
                <div className="p-5 space-y-5 grow overflow-y-auto">

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
                </div>

                <div className="flex-none border-t py-2 px-5 flex justify-end space-x-5">

                    <Button
                        type="button"
                        variant="secondary"

                        onClick={
                            () => setFieldValue("coverImage", "", true)
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
            </Modal>
        </div>

    )
}

export default CoverImage