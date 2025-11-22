import { Link, Outlet, useLocation } from 'react-router-dom';
import { Footprints, Calendar, BarChart3, Sparkles } from 'lucide-react';
import { ChatWidget } from './ChatWidget';
import clsx from 'clsx';

export function Layout() {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Головна', icon: Footprints },
        { path: '/booking', label: 'Запис', icon: Calendar },
        { path: '/admin', label: 'Адмін', icon: BarChart3 },
        { path: '/marketing', label: 'Маркетинг', icon: Sparkles },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="bg-indigo-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                                    <Footprints className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                    Insoles CRM
                                </span>
                            </Link>
                        </div>
                        <nav className="flex gap-2">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={clsx(
                                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-indigo-100 text-indigo-700 shadow-sm"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                <Outlet />
            </main>
            <ChatWidget />
        </div>
    );
}
