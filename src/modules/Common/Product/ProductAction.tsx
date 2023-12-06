import ROLE from "enums/role"
import { useFormikContext } from "formik"
import { isEmpty } from "lodash"
import Button from "modules/Common/Button"
import Loading from "modules/Common/Loading"
import ProductCategory from "modules/Common/Product/ProductCategory"
import StoreSelect from "modules/Common/Store/StoreSelect"
import { FC } from "react"
import { useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"
import { Product } from "types/product"

type ProductActionProps = {
    selectStore: boolean
}

const ProductAction: FC<ProductActionProps> = ({ selectStore }) => {
    const { isSubmitting, errors, isValid, values } = useFormikContext<Product>()
    const { type } = useAppSelector<Principle>(state => state.authenticate.principle!)

    const displayError = () => {
        console.log(errors);
    }

    return (
        <div className="space-y-5">
            <Button
                type="submit"
                disabled={isSubmitting}
                onClick={isValid ? undefined : displayError}
                variant={isEmpty(values.id) ? "primary" : "secondary"}
                className="text-sm w-full space-x-2 flex items-center"
            >
                {
                    isSubmitting ? (
                        <Loading.Circle size={12} className="text-white" />
                    ) : null
                }
                {
                    isEmpty(values.id) ? (
                        <span>Tạo mới</span>
                    ) : (
                        <span>Lưu thay đổi</span>
                    )
                }
            </Button>

            <ProductCategory />
            {
                (type === ROLE.OWNER && selectStore) ? (
                    <StoreSelect />
                ) : null
            }
        </div>
    )
}

export default ProductAction