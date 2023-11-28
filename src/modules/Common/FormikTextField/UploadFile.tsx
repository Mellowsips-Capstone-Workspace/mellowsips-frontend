import { useField, useFormikContext } from "formik";
import useUploadProgress from "hooks/useAxiosProgress";
import useBoolean from "hooks/useBoolean";
import useAbortController from "hooks/useUnmountAbortSignal";
import { isEmpty, isUndefined } from "lodash";
import Loading from "modules/Common/Loading";
import Modal from "modules/Common/Modal/Modal";
import { FC, useCallback, useEffect, useState } from "react";
import DocumentService from "services/DocumentService";
import { DocumentModel } from "types/document";

type ImagePreviewModalProps = {
    index?: number
    document: DocumentModel
    remove: (index?: number) => void
}

const ImagePreviewModal: FC<ImagePreviewModalProps> = ({ index, document, remove }) => {
    const [display, setDisplay] = useBoolean(false)
    return (
        <>
            <div className="flex space-x-5 justify-between items-center px-2 py-1 overflow-hidden">
                <div
                    className="flex space-x-5 items-center cursor-pointer hover:text-main-primary"
                    onClick={setDisplay.on}
                >
                    <img
                        src={`data:${document.fileType};base64,${document.content}`}
                        alt={document.name}
                        className="flex-none object-contain block h-12 w-12"
                    />
                    <p className="text-xs truncate">{document.name}</p>
                </div>
                <button
                    type="button"
                    onClick={() => remove(index)}
                    className="flex-none w-5 h-5 rounded-full bg-orange-500 text-white hover:bg-red-500 hover:text-white transition-color duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <Modal
                flag={display}
                closeModal={setDisplay.off}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
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
                <p className="text-xs italic text-center py-1">{document.name}</p>
            </Modal>
        </>
    )
}

type FilePreviewProps = {
    index?: number
    file: string
    remove: (index?: number) => void
}

const FilePreview: FC<FilePreviewProps> = ({ file, remove, index }) => {
    const [loading, setLoading] = useState(false)
    const [document, setDocument] = useState<DocumentModel>()

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const id = file.includes("|") ? file.substring(file.indexOf("|") + 1) : file

                const { error, status, body } = await DocumentService.get(id)
                setLoading(false)

                if (error || status !== 200 || isEmpty(body) || body.statusCode !== 200) {
                    return
                }

                setDocument(body.data)
            }
        )()
    }, [file])

    if (loading) {
        return (
            <div className=" border rounded p-5 px-5">
                <Loading.Circle className="mx-auto text-main-primary" size={16} />
                <p className="text-center text-xs text-gray-500">Đang xử lý xem trước.</p>
            </div>
        )
    }

    if (isUndefined(document)) {
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
        <div className="border rounded overflow-hidden">
            {
                isImage ? (
                    <ImagePreviewModal
                        document={document}
                        remove={remove}
                        index={index}
                    />
                ) : (
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
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="w-5 h-5 rounded-full bg-orange-500 text-white hover:bg-red-500 hover:text-white transition-color duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

type UploadDocumentProps = {
    file: File
    index?: number
    onUploadSuccess: (fileId: string, index?: number) => void
}

const UploadDocument: FC<UploadDocumentProps> = ({ file, index, onUploadSuccess }) => {
    const { setSubmitting } = useFormikContext()
    const [getAbortController] = useAbortController(true)
    const [progress, onUploadProgress] = useUploadProgress()

    const uploadDocument = useCallback(async () => {
        const abortController = getAbortController()
        const { error, body } = await DocumentService.upload(file, { abortController, onUploadProgress })

        if (abortController.signal.aborted || error || isEmpty(body) || body.statusCode !== 200) {
            return
        }

        const { data: { id } } = body

        const isImage = file.type.startsWith("image/")

        const documentId = isImage ? `${file.name}|${id}` : id


        onUploadSuccess(documentId, index)
    }, [index, file, onUploadSuccess, getAbortController, onUploadProgress])

    useEffect(() => {
        const beforeunload = (event: BeforeUnloadEvent) => {
            event.returnValue = "Changes you made may not be saved."
        }
        window.addEventListener("beforeunload", beforeunload)
        return () => window.removeEventListener("beforeunload", beforeunload)
    }, [])

    useEffect(() => {
        setSubmitting(true)
        uploadDocument()
        return () => {
            setSubmitting(false)
        }
    }, [uploadDocument, setSubmitting])

    return (
        <div className="border bg-indigo-50 flex space-x-5 rounded p-2">
            <img
                width="40"
                height="40"
                alt="upload-2"
                className="self-center flex-none"
                src="https://img.icons8.com/fluency/48/upload-2.png"
            />
            <div className="grow">
                <div className="flex items-center space-x-2">
                    <div className="grow">
                        <p className="w-32 truncate">{file.name}</p>
                    </div>
                    {
                        progress < 100 ? (
                            <span className="text-end flex-none inline-block w-12 text-sm font-medium">{progress}%</span>
                        ) : (
                            <span className="text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                </svg>
                            </span>
                        )
                    }
                </div>
                <div className="flex items-center space-x-2">
                    <div className=" w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-full rounded-full dak:bg-blue-500 transition-all duration-300 animate-pulse" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    )

}

type DocumentProps = {
    file: File | string
    index?: number
    remove: (index?: number) => void
    onUploadSuccess: (fileId: string, index?: number) => void
}

const Document: FC<DocumentProps> = ({ file, index, onUploadSuccess, remove }) => {
    return file instanceof File ? (
        <UploadDocument index={index} file={file} onUploadSuccess={onUploadSuccess} />
    ) : !isEmpty(file) ? (
        <FilePreview index={index} key={index} file={file} remove={remove} />
    ) : null
}

type UploadFileProps = {
    name: string
    accept?: string
    maxAllowedSize?: number
    placeholder?: string
    multiple?: boolean
    maxFiles?: number
}

const UploadFile: FC<UploadFileProps> = ({ name, multiple = false, accept = "*", maxAllowedSize = 10, maxFiles, placeholder }) => {
    const [{ value }, { error, touched }, { setValue, setTouched }] = useField<undefined | null | File | string | (File | string)[]>(name)

    useEffect(() => {
        setTouched(false)
    }, [setTouched])

    const checkAcceptedFiles = useCallback((files: FileList | null, currentFiles: undefined | null | File | string | (File | string)[]): File[] => {

        if (files === null) {
            return []
        }

        const allowedSize = maxAllowedSize * 1024 * 1024
        const regexAccept = new RegExp(accept === "*" ? ".*" : accept)

        let inputFiles = Array.from(files).filter(
            file => file.size <= allowedSize && regexAccept.test(file.type)
        )

        if (currentFiles === null || typeof currentFiles !== "object") {
            return inputFiles
        }

        const container = Array.from(currentFiles instanceof Array ? currentFiles : [currentFiles]).filter(
            item => item instanceof File
        ).map(
            (item) => {
                const file = item as File
                return `${file.size}${file.lastModified}${file.name}`
            }
        )

        inputFiles = inputFiles.filter(
            file => !container.includes(`${file.size}${file.lastModified}${file.name}`)
        )

        if (typeof maxFiles !== "number") {
            return inputFiles
        }

        if (container.length >= maxFiles) {
            return []
        }

        const gap = maxFiles - (Array.isArray(currentFiles) ? Array.from(currentFiles).length : 0)

        return inputFiles.slice(0, Math.max(0, gap))

    }, [maxAllowedSize, accept, maxFiles])

    const addFiles = useCallback((files: File[]) => {
        if (files.length === 0) {
            return
        }

        if (!multiple) {
            setValue(files.at(0), true)
            return
        }

        if (value instanceof File) {
            setValue([value, ...files], true)
            return
        }

        if (Array.isArray(value)) {
            setValue([...value, ...files], true)
        } else {
            setValue(files, true)
        }
    }, [multiple, setValue, value])

    const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const transferFiles = checkAcceptedFiles(event.dataTransfer.files, value)
        addFiles(transferFiles)
    }, [value, addFiles, checkAcceptedFiles])


    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return
        }
        const transferFiles = checkAcceptedFiles(event.target.files, value)
        addFiles(transferFiles)

    }, [addFiles, checkAcceptedFiles, value])

    const remove = useCallback((index?: number) => {
        if (Array.isArray(value) && typeof index === "number") {
            const values = [...value]
            values.splice(index, 1)
            setValue(values.length > 0 ? values : "", true)
            return
        }

        setValue("", true)
    }, [value, setValue])

    const onUploadSuccess = useCallback((fileId: string, index?: number) => {

        if (Array.isArray(value) && typeof index === "number") {
            const values = [...value]
            values.splice(index, 1, fileId)
            setValue(values, true)
            return
        }
        setValue(fileId, true)
    }, [setValue, value])

    const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    }, [])

    const isHidden = Boolean((!multiple && !isEmpty(value)) || (multiple && maxFiles) && (Array.isArray(value) && value.length >= maxFiles))
    return (
        <div key={name}>
            <div className="space-y-2">
                {
                    Array.isArray(value) ? value.map(
                        (file, index) => <Document key={index} index={index} file={file} onUploadSuccess={onUploadSuccess} remove={remove} />
                    ) : (
                        <Document file={value!} onUploadSuccess={onUploadSuccess} remove={remove} />
                    )
                }

                <label
                    className="aria-hidden:hidden block border-2 border-dashed rounded-lg p-5 text-center hover:bg-medium cursor-pointer transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    aria-hidden={isHidden}
                >
                    <img className="inline select-none" src="/images/clarity_upload-cloud-line.svg" width={40} alt="upload" />
                    <p className="pt-2">{placeholder ? placeholder : "Chọn hoặc kéo thả file vào đây!"}</p>
                    <input
                        value={""}
                        type="file"
                        multiple={multiple}
                        accept={accept}
                        hidden={true}
                        name={name}
                        onChange={handleOnChange}
                    />
                </label>
            </div>
            {Boolean(error && touched) && <span className="text-danger text-xs">{error}</span>}
        </div >
    )
}
export default UploadFile