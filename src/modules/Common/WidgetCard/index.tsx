
import { ForwardedRef, forwardRef } from 'react';
import { cn } from 'shadcn/utils';

const widgetCardClasses = {
    base: 'bg-white shadow p-5',
    rounded: {
        sm: 'rounded-sm',
        DEFAULT: 'rounded-lg',
        lg: 'rounded-xl',
        xl: 'rounded-2xl'
    },
}

type WidgetCardTypes = {
    title: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
    rounded?: keyof typeof widgetCardClasses.rounded
    headerClassName?: string
    actionClassSName?: string
    descriptionClassName?: string
    className?: string
}

function WidgetCard(
    {
        title,
        action,
        description,
        rounded = 'DEFAULT',
        className,
        headerClassName,
        actionClassSName,
        descriptionClassName,
        children,
    }: React.PropsWithChildren<WidgetCardTypes>,
    ref: ForwardedRef<HTMLDivElement>
) {
    return (
        <div
            className={cn(
                widgetCardClasses.base,
                widgetCardClasses.rounded[rounded],
                className
            )}
            ref={ref}
        >
            <div
                className={
                    cn(
                        action && 'flex items-start justify-between',
                        headerClassName
                    )
                }
            >
                <div>
                    {title}
                    {
                        description && (
                            <div className={descriptionClassName}>{description}</div>
                        )
                    }
                </div>
                {action && <div className={cn('ps-2', actionClassSName)}>{action}</div>}
            </div>
            {children}
        </div>
    );
}

export default forwardRef(WidgetCard)
