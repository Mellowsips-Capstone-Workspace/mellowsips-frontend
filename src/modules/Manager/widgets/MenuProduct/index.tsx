import { isEmpty } from 'lodash';
import CloneProduct from 'modules/Manager/components/Menu/CloneProduct';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

const MenuProduct: FC = () => {
    const [params] = useSearchParams()
    const parentId = params.get("parentId")

    return (
        <div>
            {
                isEmpty(parentId) ? null : <CloneProduct parentId={parentId!} />
            }
        </div>
    )
}

export default MenuProduct