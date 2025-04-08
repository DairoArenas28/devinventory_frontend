import { Link, Outlet } from "react-router-dom";
import { Menu, LayoutDashboard, Settings, LogOut, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";

export default function AdminView() {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navigation = [
        { name: "Dashboard", href: "/admin/dashboard" , icon: LayoutDashboard },
        { name: "Settings", href: "", icon: Settings },
        { name: "Product", href: "/admin/product", icon: ShoppingBag }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`${sidebarOpen ? "w-64" : "w-16"
                    } bg-white shadow-lg transition-all duration-300 flex flex-col`}
            >
                <div className="flex items-center justify-between p-3 border-b">
                    <span className="text-lg font-bold text-gray-800">
                        {sidebarOpen ? "Admin" : "A"}
                    </span>
                    <button
                        className="p-2 rounded hover:bg-gray-200"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
                <nav className="flex-1 px-2 py-4">
                    {navigation.map((item) => (
                        <Link
                            to={item.href}
                            key={item.name}
                            className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded mb-1 gap-3"
                        >
                            <item.icon className="w-5 h-5" />
                            {sidebarOpen && item.name}
                        </Link>
                    ))}
                </nav>
                <div className="p-4">
                    <button className="flex items-center w-full px-3 py-2 text-white bg-red-500 hover:bg-red-600 rounded gap-3">
                        <LogOut className="w-5 h-5" />
                        {sidebarOpen && "Logout"}
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow p-4">
                    <h1 className="text-xl font-semibold">Panel de Administración</h1>
                </header>
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="bg-white rounded-2xl shadow p-6 min-h-[200px]">
                        <Outlet />
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </div>
    )
}