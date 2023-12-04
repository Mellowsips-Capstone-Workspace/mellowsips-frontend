import { isEmpty } from 'lodash';
import CloneProduct from 'modules/Manager/components/Menu/CloneProduct';
import CreateProduct from 'modules/Manager/components/Menu/CreateProduct';
import { FC } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

const MenuProduct: FC = () => {
    const [params] = useSearchParams()
    const parentId = params.get("parentId")
    const menuId = params.get("menuId")

    if (isEmpty(menuId)) {
        return <Navigate to="/" />
    }

    return (
        <div>
            {
                isEmpty(parentId) ? <CreateProduct menuId={menuId!} /> : <CloneProduct menuId={menuId!} parentId={parentId!} />
            }
        </div>
    )
}

export default MenuProduct