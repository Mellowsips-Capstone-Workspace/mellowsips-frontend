import { useField } from "formik";
import useBoolean from "hooks/useBoolean";
import { debounce } from "lodash";
import { ChangeEvent, FC, FocusEvent, KeyboardEvent, MouseEvent, useCallback, useEffect, useMemo, useState } from "react";

type AutocompleteInputProps = {
    name: string
    placeholder?: string
    sensitive?: boolean
    acceptedInOptions?: boolean
    errorMessage?: string
    options?: string[]
}
const AutocompleteInput: FC<AutocompleteInputProps> = (
    {
        name,
        placeholder,
        sensitive = false,
        acceptedInOptions = true,
        errorMessage,
        options = []
    }
) => {
    const [
        { onBlur, value },
        { error, touched },
        { setValue, setError, setTouched }
    ] = useField<string>(name)

    const [search, setSearch] = useState(value)
    const [expand, setExpand] = useBoolean(false)
    const [searchResults, setSearchResults] = useState(options)
    const { on, off } = setExpand

    useEffect(() => {
        setTouched(false)
    }, [setTouched])

    const handleSearch = useCallback((keyword: string) => {

        const keywordValue = sensitive ? keyword.trim().toLowerCase() : keyword.trim()

        if (keywordValue.length === 0) {
            setSearchResults(options)
            return
        }

        const results = options.filter(
            item => sensitive ? item.toLowerCase().includes(keywordValue) : item.includes(keywordValue)
        )
        setSearchResults(results)
    }, [options, sensitive])

    const searchDebounce = useMemo(() => {
        return debounce(handleSearch, 500, { trailing: true })
    }, [handleSearch])

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        searchDebounce(event.target.value)
        on()
    }, [searchDebounce, on])

    const handleOnClick = useCallback(() => {
        on()
    }, [on])


    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        if (!touched) {
            onBlur(event)
        }
        setTimeout(() => off(), 500)

        if (!acceptedInOptions || options.includes(event.currentTarget.value)) {
            return
        }
        setValue("")
        setError(errorMessage || "Lựa chọn không hợp lệ.")
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || (acceptedInOptions && !options.includes(value))) {
            setError(errorMessage || "Lựa chọn không hợp lệ.")
        }
    }

    const handleSelect = useCallback((event: MouseEvent<HTMLDivElement>) => {
        off()
        setValue(event.currentTarget.dataset.value || "")
        setSearch(event.currentTarget.dataset.value || "")
        setSearchResults([])
    }, [setValue, off])

    return (
        <div key={name}>
            <div className="relative">
                <input
                    name={name}
                    value={search}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    onClick={expand ? undefined : handleOnClick}
                    aria-invalid={Boolean(error && touched)}
                    className="peer w-full outline-none py-2.5 rounded-2 border px-3 aria-invalid:border-danger transition-colors duration-300"
                />
                {
                    expand && searchResults.length ? (
                        <div className="min-w-full absolute z-auto bg-white mt-1 scrollbar-xs max-h-80 overflow-y-auto autocomplete-dropdown-container rounded overflow-hidden">
                            {
                                searchResults.map(
                                    (item) => (
                                        <div
                                            key={item}
                                            data-value={item}
                                            onClick={handleSelect}
                                            className="cursor-pointer last:border-b-0 border-b px-2 py-1 hover:bg-light"
                                        >
                                            <span>{item}</span>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    ) : null
                }
            </div>
            {Boolean(error && touched) && <span className="text-danger text-xs">{error}</span>}
        </div>
    )

}

export default AutocompleteInput