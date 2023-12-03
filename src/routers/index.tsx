import ROLE from "enums/role"
import CryptoLocalStorageHelper, { CRYPTO_STORAGE_KEY } from "helpers/storage.ts"
import useComponentWillMount from "hooks/useComponentWillMount"
import { isUndefined } from "lodash"
import AdminRoutes from "routers/AdminRoutes"
import OwnerRoutes from "routers/OwnerRoutes"
import PublicRoutes from "routers/PublicRoutes"
import StaffRoutes from "routers/StaffRoutes"
import { loadAuthenticate } from "stores/authenticate"
import { useAppDispatch, useAppSelector } from "stores/root.ts"
import { AuthenticateStore } from "types/authenticate"

const AppRouter = () => {
    const dispatch = useAppDispatch()
    const { isLoading, logged, principle } = useAppSelector<AuthenticateStore>(state => state.authenticate)

    useComponentWillMount(
        () => {
            if (isLoading) {
                return
            }

            const token = CryptoLocalStorageHelper.getItem(CRYPTO_STORAGE_KEY.TOKEN)
            if (isUndefined(token)) {
                return
            }
            dispatch(loadAuthenticate())
        }
    )

    if (!logged || isLoading) {
        return <PublicRoutes isLoading={isLoading} />
    }
    console.log(principle.type);


    return (
        <>
            {
                principle.type === ROLE.ADMIN ? (
                    <AdminRoutes />
                ) : null
            }
            {
                principle.type === ROLE.OWNER ? (
                    <OwnerRoutes />
                ) : null
            }
            {
                principle.type === ROLE.STAFF ? (
                    <StaffRoutes />
                ) : null
            }
        </>
    )
}

export default AppRouter