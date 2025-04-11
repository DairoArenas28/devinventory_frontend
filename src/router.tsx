import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layouts/Auth.Layout";
import LoginView from "./modules/login/LoginView";
import AppLayout from "./layouts/App.Layout";
import DashboardView from "./modules/dashboard/DashboardView";
import { ProductView } from "./modules/products/ProductPage";
import { CategoryPage } from "./modules/category/CategoryPage";
import RegisterView from "./modules/login/RegisterView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>
                <Route element={<AppLayout/>}>
                    <Route path='/admin/dashboard' element={<DashboardView />} />
                    <Route path='/admin/product' element={<ProductView />} />
                    <Route path='/admin/category' element={<CategoryPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}