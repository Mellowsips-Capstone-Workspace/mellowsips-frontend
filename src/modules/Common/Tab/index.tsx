import { isUndefined } from "lodash"
import { FC, MouseEvent, ReactNode, createContext, useCallback, useContext, useState } from "react"

type ContextType = {
    tab: string
    setTab: (tab: string) => void
} | undefined

const Context = createContext<ContextType>(undefined)

type ItemProps = {
    className?: string
    displayValue: string
    value: string
}

const Item: FC<ItemProps> = ({ className, value, displayValue }) => {
    const { tab, setTab } = useContext<ContextType>(Context)!

    const handleSetTab = useCallback((event: MouseEvent<HTMLDivElement>) => {
        setTab(event.currentTarget.dataset.value!)
    }, [setTab])

    return (
        <div
            className={className}
            aria-checked={tab === value}
            data-value={value}
            onClick={handleSetTab}
        >
            {displayValue}
        </div>
    )
}

type ProviderProps = {
    defaultValue?: string
    onTabChange?: (tab: string) => void
    className?: string
    children: ReactNode
}


const Container: FC<ProviderProps> = ({ defaultValue, children, className, onTabChange }) => {
    const [tab, setTab] = useState(isUndefined(defaultValue) ? "" : defaultValue)

    const handleSetTab = useCallback((tab: string) => {
        setTab(tab)
        if (isUndefined(onTabChange)) {
            return
        }
        onTabChange(tab)
    }, [onTabChange])

    return (
        <Context.Provider value={{ tab, setTab: handleSetTab }} >
            <div className={className}>
                {children}
            </div>
        </Context.Provider>
    )
}

const Tab = {
    Item,
    Container
}

export default Tab