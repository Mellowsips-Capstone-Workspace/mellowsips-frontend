import 'assets/styles/tailwind.css';
import { FC, StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'routers';
import { store } from "stores/root.ts";

const App: FC = () => {
    return (
        <StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <AppRouter />
                </Provider>
                <Toaster
                    position="bottom-right"
                    containerClassName="print:hidden"
                    reverseOrder={false}
                    containerStyle={{ inset: 20 }}
                    toastOptions={{ duration: 3000 }}
                />
            </BrowserRouter>
        </StrictMode>
    )
}

export default App