import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Clock } from 'lucide-react';

export function LandingPage() {
    return (
        <div className="space-y-20 pb-12">
            {/* Hero Section */}
            <section className="relative text-center space-y-8 py-20 px-4">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-gray-50 to-gray-50 opacity-70"></div>

                <div className="space-y-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 animate-fade-in-up">
                        Здоров'я ваших ніг — <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            наша турбота
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
                        Індивідуальні ортопедичні устілки за німецькою технологією PEDCAD.
                        Діагностика, виготовлення та корекція — все в одному місці.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-200">
                    <Link
                        to="/booking"
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                        Записатися на діагностику
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/marketing"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                    >
                        Дізнатися більше
                    </Link>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Німецька якість",
                            description: "Використовуємо сертифіковані матеріали та технологію PEDCAD для максимальної точності."
                        },
                        {
                            icon: Clock,
                            title: "Швидке виготовлення",
                            description: "Від діагностики до готових устілок — всього 7-10 днів. Гарантія якості."
                        },
                        {
                            icon: Star,
                            title: "Індивідуальний підхід",
                            description: "Кожна устілка створюється під унікальну будову вашої стопи для ідеального комфорту."
                        }
                    ].map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                            <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats/Trust Section */}
            <section className="bg-gray-900 text-white py-16 rounded-3xl mx-4 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-12">Чому нам довіряють?</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "5000+", label: "Задоволених клієнтів" },
                            { number: "10+", label: "Років досвіду" },
                            { number: "100%", label: "Гарантія якості" },
                            { number: "24/7", label: "Підтримка" },
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="text-4xl font-bold text-indigo-400">{stat.number}</div>
                                <div className="text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
