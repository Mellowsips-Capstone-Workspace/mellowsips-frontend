import { FC, ReactNode } from 'react'

type DisableFieldProps = {
    children: ReactNode
    disable: boolean
}
const DisableField: FC<DisableFieldProps> = ({ children, disable }) => {
    return disable ? (
        <div className='cursor-not-allowed opacity-80'>
            <div className='pointer-events-none'>
                {children}
            </div>
        </div>
    ) : children
}

export default DisableField