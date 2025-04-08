import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layouts/Auth.Layout";
import LoginView from "./views/LoginView";
import AppLayout from "./layouts/App.Layout";
import DashboardView from "./views/dashboard/DashboardView";
import { ProductView } from "./views/product/ProductView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path='/auth/login' element={<LoginView />} />
                </Route>
                <Route element={<AppLayout/>}>
                    <Route path='/admin/dashboard' element={<DashboardView />} />
                    <Route path='/admin/product' element={<ProductView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}