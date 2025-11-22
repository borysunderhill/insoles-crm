import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Calendar, Phone, Clock, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Appointment {
    id: string;
    start_time: string;
    status: string;
    clients: {
        full_name: string;
        phone: string;
    } | {
        full_name: string;
        phone: string;
    }[];
}

export function AdminDashboard() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<{ name: string; count: number }[]>([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const { data, error } = await supabase
                .from('appointments')
                .select(`
          id,
          start_time,
          status,
          clients (
            full_name,
            phone
          )
        `)
                .order('start_time', { ascending: true });

            if (error) throw error;

            const apps = data as any[] || [];
            setAppointments(apps);
            calculateStats(apps);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (apps: Appointment[]) => {
        const today = new Date();
        const start = startOfWeek(today, { weekStartsOn: 1 });
        const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

        const data = weekDays.map(day => {
            const count = apps.filter(app => isSameDay(new Date(app.start_time), day)).length;
            return {
                name: format(day, 'EEEE', { locale: uk }),
                count
            };
        });

        setStats(data);
    };

    if (loading) {
        return <div className="text-center py-8">Завантаження...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold mb-6">Панель Адміністратора</h1>

                {/* Stats Chart */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-indigo-600" />
                        Записи цього тижня
                    </h2>

                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={stats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="font-semibold text-gray-800">Всі записи</h2>
                    </div>

                    {appointments.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            Поки що немає записів.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {appointments.map((app) => (
                                <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                                                <Calendar className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-medium text-gray-900">
                                                        {Array.isArray(app.clients)
                                                            ? app.clients[0]?.full_name
                                                            : app.clients?.full_name || 'Невідомий'}
                                                    </h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${app.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {app.status === 'scheduled' ? 'Заплановано' : app.status}
                                                    </span>
                                                </div>

                                                <div className="space-y-1 text-sm text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        {format(new Date(app.start_time), "d MMMM yyyy 'о' HH:mm", { locale: uk })}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4" />
                                                        {Array.isArray(app.clients)
                                                            ? app.clients[0]?.phone
                                                            : app.clients?.phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="text-gray-400 hover:text-indigo-600">
                                            Редагувати
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
