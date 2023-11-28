import ROLE from "enums/role"
import { useFormikContext } from "formik"
import Button from "modules/Common/Button"
import ProductCategory from "modules/Manager/components/Product/components/ProductCategory"
import StoreSelect from "modules/Manager/components/Product/components/StoreSelect"
import { useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"
import { Product } from "types/product"

const ProductAction = () => {
    const { isSubmitting } = useFormikContext<Product>()
    const { type } = useAppSelector<Principle>(state => state.authenticate.principle!)

    return (
        <div className="space-y-5">
            <Button
                type="submit"
                disabled={isSubmitting}
                variant="green"
                className="text-sm w-full"
            >
                Lưu
            </Button>

            <ProductCategory />
            {
                type === ROLE.OWNER ? (
                    <StoreSelect />
                ) : null
            }

        </div>
    )
}

export default ProductAction