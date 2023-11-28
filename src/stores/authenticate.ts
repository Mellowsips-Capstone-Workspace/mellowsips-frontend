import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CryptoLocalStorageHelper, { CRYPTO_STORAGE_KEY } from "helpers/storage";
import { isEmpty } from "lodash";
import AuthenticateService from "services/AuthenticateService";
import { AuthenticateStore } from "types/authenticate.ts";

const initialState: AuthenticateStore = {
    isLoading: false,
    logged: false,
    principle: undefined
}
export const loadAuthenticate = createAsyncThunk(
    "authenticate/loadCredential",
    async () => {
        return await AuthenticateService.me()
    }
)

const authenticateSlice = createSlice(
    {
        name: "authenticate",
        initialState,
        reducers: {
            clearPrinciple: (state: AuthenticateStore): void => {
                CryptoLocalStorageHelper.removeItem(CRYPTO_STORAGE_KEY.TOKEN)
                state.isLoading = false
                state.logged = false
                state.principle = undefined
            }
        },
        extraReducers: (builder) => {
            builder.addCase(
                loadAuthenticate.pending,
                (state: AuthenticateStore) => {
                    state.isLoading = true
                    state.logged = false
                    state.principle = undefined
                }
            ).addCase(
                loadAuthenticate.rejected,
                (state: AuthenticateStore) => {
                    state.isLoading = false
                    state.logged = false
                    state.principle = undefined
                }
            ).addCase(
                loadAuthenticate.fulfilled,
                (state: AuthenticateStore, { payload }) => {
                    state.isLoading = false
                    if (payload.error || isEmpty(payload.body) || payload.status !== 200 || payload.body.statusCode !== 200) {
                        state.logged = false
                        state.principle = undefined
                        CryptoLocalStorageHelper.removeItem(CRYPTO_STORAGE_KEY.TOKEN)
                    } else {
                        const { body: { data } } = payload
                        state.logged = true
                        state.principle = data
                    }
                }
            )
        }
    }
)

export const { clearPrinciple } = authenticateSlice.actions

export default authenticateSlice.reducer