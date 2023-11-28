import { useFormikContext } from "formik"
import Button from "modules/Common/Button"
import ProductCategory from "modules/Manager/components/Product/components/ProductCategory"
import { Product } from "types/product"

const ProductAction = () => {
    const { isValid, isSubmitting } = useFormikContext<Product>()
    return (
        <div className="space-y-5">

            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                variant="green"
                className="text-sm w-full"
            >
                Lưu toàn bộ thay đổi
            </Button>


            <ProductCategory />

        </div>
    )
}

export default ProductAction