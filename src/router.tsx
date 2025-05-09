import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import LoginView from "./modules/login/LoginView";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./modules/dashboard/DashboardView";
import { ProductView } from "./modules/products/ProductPage";
import { CategoryPage } from "./modules/category/CategoryPage";
import RegisterView from "./modules/login/RegisterView";

//Componentes del cliente
import { ShopLayout } from "./modules/shop/layout/ShopLayout";
import HomePage from './modules/shop/pages/HomePage'
import CategoryPageView from './modules/shop/pages/CategoryPage'

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
                    <Route path='/admin/order' element={<CategoryPage />} />
                </Route>
                <Route element={<ShopLayout/>}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/category' element={<CategoryPageView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}