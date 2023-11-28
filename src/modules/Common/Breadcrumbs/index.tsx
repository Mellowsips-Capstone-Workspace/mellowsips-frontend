import { FC } from "react"

type BreadcrumbsProps = {
    breadcrumbs: string[]
}
const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
    const lastIndex = breadcrumbs.length - 1
    return (
        <div className="flex space-x-2">
            {
                breadcrumbs.map(
                    (breadcrumb, index) => (
                        <div key={index} className="space-x-2 py-1">
                            <span className={index < lastIndex ? "text-gray-500" : "text-main-secondary"}>{breadcrumb}</span>
                            {
                                index < lastIndex ? (
                                    <span className="text-gray-500">/</span>
                                ) : null
                            }
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Breadcrumbs