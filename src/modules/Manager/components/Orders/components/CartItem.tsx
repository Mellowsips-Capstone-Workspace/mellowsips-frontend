import { Content, Portal, Root, Trigger } from '@radix-ui/react-hover-card';
import { isString } from 'lodash';
import DocumentPreview from 'modules/Common/Document';
import { FC, ReactNode } from "react";
import { type CartItem } from "types/order";

type CartItemProps = {
    cartItems: CartItem[],
    children: ReactNode
}

const CartItem: FC<CartItemProps> = ({ children, cartItems }) => {
    return (
        <Root>
            <Trigger>
                {children}
            </Trigger>
            <Portal>
                <Content
                    align='start'
                    className='mt-2 bg-white border shadow rounded p-5 space-y-2'
                >

                    {
                        cartItems.map(
                            ({ id, addons, note, product, quantity }) => (
                                <div
                                    key={id}
                                    className="flex space-x-5"
                                >
                                    <div className='h-14 w-14 flex-none'>
                                        <DocumentPreview
                                            documentId={product.coverImage}
                                            loadingMessage={false}
                                            displayFileName={false}
                                        />
                                    </div>

                                    <div>
                                        <p className='space-x-1 text-gray-500 text-sm'>
                                            <span>{product.name}</span>
                                            <span className='text-main-primary text-xs'>(x{quantity})</span>
                                        </p>
                                        {
                                            addons.length ? (

                                                <p className='space-x-1 text-sm'>
                                                    <span className='text-gray-500'>Tuỳ chọn:</span>
                                                    <span>{addons.map(addon => addon.name).join(", ")}</span>
                                                </p>
                                            ) : null
                                        }
                                        {
                                            isString(note) && note.length ? (

                                                <p className='space-x-1 text-sm'>
                                                    <span className='text-gray-500'>Ghi chú:</span>
                                                    <span>{note}</span>
                                                </p>
                                            ) : null
                                        }




                                    </div>

                                </div>
                            )
                        )
                    }


                </Content>

            </Portal>

        </Root>
    )
}

export default CartItem