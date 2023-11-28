import { isUndefined } from 'lodash'
import { Widget } from 'modules/Layout/Dashboard'
import StoreDetail from 'modules/Manager/components/Store'
import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'

const StoreInfo: FC = () => {
    const { storeId } = useParams()

    if (isUndefined(storeId)) {
        return <Navigate to="/stores" replace={true} />
    }

    return (
        <Widget className="space-y-5">
            <StoreDetail storeId={storeId} />
        </Widget >
    )
}

export default StoreInfo