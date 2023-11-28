import DocumentCacheHelper from "helpers/cache"
import useBoolean from "hooks/useBoolean"
import { isEmpty, isUndefined } from "lodash"
import Loading from "modules/Common/Loading"
import Modal from "modules/Common/Modal/Modal"
import { FC, memo, useEffect, useState } from "react"
import DocumentService from "services/DocumentService"
import { DocumentModel } from "types/document"

type ImagePreviewModalProps = {
    document: DocumentModel
    displayFileName?: boolean
}

const ImagePreviewModal: FC<ImagePreviewModalProps> = ({ document, displayFileName }) => {
    const [display, setDisplay] = useBoolean(false)
    return (
        <>
            <div
                className="cursor-pointer hover:text-main-primary space-y-1"
                onClick={setDisplay.on}
            >
                <img
                    src={`data:${document.fileType};base64,${document.content}`}
                    alt={document.name}
                    className="flex-none object-contain block w-full rounded"
                />
                {
                    displayFileName ? <p className="text-center italic text-xs opacity-50 truncate">{document.name}</p> : null
                }

            </div>

            <Modal
                flag={display}
                closeModal={setDisplay.off}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-5 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <div className="flex items-center justify-between p-2 shadow border-b space-x-2">
                    <p className="truncate font-medium">Trình Xem Ảnh</p>
                    <button
                        type="button"
                        onClick={setDisplay.off}
                        className="flex-none w-5 h-5 rounded-full bg-orange-500 text-white hover:bg-red-500 hover:text-white transition-color duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="grow p-2 overflow-auto">
                    <img
                        src={`data:${document.fileType};base64,${document.content}`}
                        alt={document.name}
                        className="w-full rounded"
                    />
                </div>
                {
                    displayFileName ? <p className="text-xs italic text-center py-1">{document.name}</p> : null
                }
            </Modal>
        </>
    )
}

type DocumentPreviewProps = {
    documentId: string
    displayFileName?: boolean
    loadingMessage?: boolean
}

const DocumentPreview: FC<DocumentPreviewProps> = ({ documentId, displayFileName = true, loadingMessage = true }) => {
    const [loading, setLoading] = useState(false)
    const [document, setDocument] = useState<DocumentModel>(DocumentCacheHelper.get(documentId)!)


    useEffect(() => {
        if (isEmpty(documentId)) {
            return
        }

        (
            async () => {
                const cacheDocument = DocumentCacheHelper.get(documentId)
                if (cacheDocument) {
                    setDocument(cacheDocument)
                    return
                }

                setLoading(true)
                const id = documentId.includes("|") ? documentId.substring(documentId.indexOf("|") + 1) : documentId

                const { error, status, body } = await DocumentService.get(id)
                setLoading(false)

                if (error || status !== 200 || isEmpty(body) || body.statusCode !== 200) {
                    return
                }

                DocumentCacheHelper.set(documentId, body.data)
                setDocument(body.data)
            }
        )()
    }, [documentId])

    if (loading) {
        return (
            <div className="animate-pulse bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 border grid place-content-center rounded p-5 min-h-full min-w-full">
                <Loading.Circle className="mx-auto text-white" size={16} />
                {
                    loadingMessage ? (
                        <p className="text-center text-xs text-white">Đang xử lý xem trước.</p>
                    ) : null
                }
            </div>
        )
    }

    if (isUndefined(document) || isEmpty(documentId)) {
        return null
    }

    const handleDownload = () => {
        const linkElement = window.document.createElement("a")
        linkElement.hidden = true
        linkElement.href = `data:${document.fileType};base64,${document.content}`
        linkElement.download = document.name
        linkElement.click()
        linkElement.remove()
    }

    const isImage = document.fileType.startsWith("image")

    return (
        <>
            {
                isImage ? (
                    <ImagePreviewModal displayFileName={displayFileName} document={document} />
                ) : (
                    <div className="border rounded overflow-hidden">
                        <div className="px-2 flex justify-between items-center">
                            <div
                                className="flex items-center cursor-pointer hover:text-main-primary"
                                onClick={handleDownload}
                            >
                                <img
                                    className="flex-none"
                                    width="40"
                                    height="40"
                                    src="https://img.icons8.com/fluency/48/cloud-file.png"
                                    alt="cloud-file"
                                />
                                <p className="text-sm grow truncate">{document.name}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default memo(DocumentPreview)