import FormikTextField from "modules/Common/FormikTextField"
import CoverImage from "modules/Manager/components/Product/components/CoverImage"
import ProductAction from "modules/Manager/components/Product/components/ProductAction"
import { FC } from "react"

const EssentialInfo: FC = () => {
    return (
        <div className="grid grid-cols-4 gap-5">
            <div className="col-span-3 bg-white p-5 space-y-5 shadow rounded">
                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1">
                        <label className="text-gray-500 font-medium">Tên sản phẩm</label>
                        <FormikTextField.Input
                            name="name"
                            placeholder="Ví dụ: Trà đào"
                        />
                    </div>

                    <FormikTextField.CurrencyVNDInput
                        className="space-y-1"
                        label="Giá"
                        labelClassName="text-gray-500 font-medium"
                        name="price"
                        placeholder="Ví dụ: 1000đ"
                    />
                </div>
                <div className="flex gap-5">
                    <div className="flex-none h-40 aspect-square rounded border">
                        <CoverImage />
                    </div>
                    <div className="grow">
                        <FormikTextField.Textarea
                            row={6}
                            name="description"
                            placeholder="Thêm mô tả chi tiết."
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 space-y-5 shadow rounded">
                <ProductAction />
            </div>
        </div>
    )
}

export default EssentialInfo