import NotFound from "modules/Common/Notfound";
import WaitingPage, { Waiting } from "modules/Common/WaitingPage";
import BlankLayout from "modules/Layout/Blank";
import HomeLayout from "modules/Layout/Home";
import { FC, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrintRoutes from "routers/PrintRoutes";

const LoginPage = lazy(() => import('modules/Auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('modules/Auth/pages/RegisterPage'));
const VerifyPage = lazy(() => import('modules/Auth/pages/VerifyOtpPage'));
const AboutUsPage = lazy(() => import('modules/Home/pages/AboutUsPage'));
const ContactPage = lazy(() => import('modules/Home/pages/ContactPage'));
const FAQPage = lazy(() => import('modules/Home/pages/FAQPage'));
const HomePage = lazy(() => import('modules/Home/pages/HomePage'));

type PublicRoutesProps = {
    isLoading: boolean
}

const PublicRoutes: FC<PublicRoutesProps> = ({ isLoading }) => {

    if (isLoading) {
        return (
            <Routes>
                <Route path="*" element={<WaitingPage />} />
            </Routes>
        )
    }

    return (
        <Routes>
            {
                PrintRoutes
            }

            <Route element={<HomeLayout />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<Waiting />}>
                            <HomePage />
                        </Suspense>
                    }
                />
                <Route
                    path="contact"
                    element={
                        <Suspense fallback={<Waiting />}>
                            <ContactPage />
                        </Suspense>
                    }
                />
                <Route
                    path="about-us"
                    element={
                        <Suspense fallback={<Waiting />}>
                            <AboutUsPage />
                        </Suspense>
                    }
                />
                <Route
                    path="faq"
                    element={
                        <Suspense fallback={<Waiting />}>
                            <FAQPage />
                        </Suspense>
                    }
                />

            </Route>

            <Route
                element={<BlankLayout />}
            >
                <Route
                    path="login"
                    element={
                        <Suspense fallback={<Waiting />}>
                            <LoginPage />
                        </Suspense>
                    }
                />
                <Route
                    path="register"
                    element={
                        <Suspense fallback={<Waiting />}>
                            <RegisterPage />
                        </Suspense>
                    }
                />
                <Route
                    path="verify"
                    element={
                        <Suspense fallback={<Waiting />}>
                            <VerifyPage />
                        </Suspense>
                    }
                />
            </Route>

            <Route path="*" element={<NotFound variant="page" />} />
        </Routes >
    )
}

export default PublicRoutes