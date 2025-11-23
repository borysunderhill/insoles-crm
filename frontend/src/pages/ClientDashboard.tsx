import { useAuth } from '../context/AuthContext';
import { LogOut, User, Calendar } from 'lucide-react';

export function ClientDashboard() {
    const { user, signOut } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Кабінет Клієнта</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User className="h-4 w-4" />
                                <span>{user?.email}</span>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Вийти
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                        <div className="px-4 py-5 sm:px-6">
                            <h2 className="text-lg leading-6 font-medium text-gray-900">Мої Записи</h2>
                            <p className="mt-1 text-sm text-gray-500">Історія ваших візитів та майбутні записи.</p>
                        </div>
                        <div className="px-4 py-5 sm:p-6 text-center">
                            <div className="mx-auto h-12 w-12 text-gray-400">
                                <Calendar className="h-12 w-12" />
                            </div>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Записів поки немає</h3>
                            <p className="mt-1 text-sm text-gray-500">Запишіться на діагностику, щоб побачити інформацію тут.</p>
                            <div className="mt-6">
                                <a
                                    href="/booking"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Записатися
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
