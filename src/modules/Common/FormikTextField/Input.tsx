import { useField } from "formik";
import useBoolean from "hooks/useBoolean";
import { FC, useEffect } from "react";

type InputProps = {
    name: string
    placeholder?: string
    type?: string
    sm?: boolean
}

const Input: FC<InputProps> = ({ name, placeholder, type = "text", sm = false }) => {
    const [{ onBlur, onChange, value = "" }, { error, touched }, { setTouched }] = useField(name)
    const [hidden, setHidden] = useBoolean(true)

    useEffect(() => {
        setTouched(false)
    }, [setTouched])

    return (
        <div>
            {
                type === "password" ? (
                    <div
                        aria-invalid={Boolean(error && touched)}
                        className="w-full flex space-x-2 rounded-2 border px-3 aria-invalid:border-danger transition-colors duration-300"
                    >
                        <input
                            name={name}
                            type={hidden ? "password" : "text"}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder={placeholder}
                            className={`outline-none grow block ${sm ? "py-0.5" : "py-2.5"}`}
                        />
                        <button
                            type="button"
                            onClick={setHidden.toggle}
                            className="outline-none text-gray-500 hover:text-main-primary cursor-pointer transition-colors"
                        >
                            {
                                hidden ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
                                        <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                                    </svg>

                                )
                            }
                        </button>

                    </div>
                ) : (
                    <input
                        name={name}
                        type={type}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder={placeholder}
                        aria-invalid={Boolean(error && touched)}
                        className={`w-full outline-none border aria-invalid:border-danger transition-colors duration-300 ${sm ? "py-0.5 px-2 rounded" : "py-2.5 px-3 rounded-2"}`}
                    />
                )
            }
            {Boolean(error && touched) && <span className="text-danger text-xs">{error}</span>}
        </div>
    )
}

export default Input