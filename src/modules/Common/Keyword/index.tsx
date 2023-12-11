import { ChangeEvent, FC, KeyboardEvent, MouseEvent, useCallback, useState } from "react"

type KeywordProps = {
    keyword: string
    placeholder?: string
    setKeyword: (keyword: string) => void | string
}

const Keyword: FC<KeywordProps> = ({ keyword, setKeyword, placeholder }) => {
    const [value, setValue] = useState(keyword)

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }, [])

    const onKeydown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") {
            return
        }
        const value = event.currentTarget.value!.trim()
        setKeyword(value)
        setValue(value)
    }, [setKeyword])

    const handleSearch = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.dataset.value!.trim()
        setKeyword(value)
        setValue(value)
    }, [setKeyword])

    return (
        <div className="flex min-w-full py-1.5 rounded-2 border px-3 bg-white focus-within:border-main-primary">
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder || "Tìm kiếm ..."}
                onKeyDown={onKeydown}
                className="grow outline-none"
            />
            {
                value.length ? (
                    <button
                        type="button"
                        className="mr-1 hover:text-main-primary text-gray-200"
                        onClick={handleSearch}
                        data-value=""
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    </button>
                ) : null
            }
            <button
                type="button"
                className="flex-none block w-6 h-6 p-0.5"
                onClick={handleSearch}
                data-value={value}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>
        </div>
    )
}

export default Keyword