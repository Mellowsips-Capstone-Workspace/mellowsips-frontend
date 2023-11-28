import ROLE from "enums/role"
import CryptoLocalStorageHelper, { CRYPTO_STORAGE_KEY } from "helpers/storage.ts"
import useComponentWillMount from "hooks/useComponentWillMount"
import { isUndefined } from "lodash"
import AdminRoutes from "routers/AdminRoutes"
import ManageRoutes from "routers/ManageRoutes"
import PublicRoutes from "routers/PublicRoutes"
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

    return (
        <>
            {
                principle && principle.type === ROLE.ADMIN ? (
                    <AdminRoutes />
                ) : (
                    <ManageRoutes />
                )
            }
        </>
    )
}

export default AppRouter