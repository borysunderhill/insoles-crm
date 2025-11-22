import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, User, Phone } from 'lucide-react';

export function BookingPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        date: '',
        time: '10:00'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create or get client
            // Note: In a real app, we'd check if client exists first. 
            // For simplicity, we'll just insert and ignore conflict on phone (if we set up that constraint)
            // or just insert a new record for now.

            const { data: clientData, error: clientError } = await supabase
                .from('clients')
                .insert([
                    { full_name: formData.fullName, phone: formData.phone }
                ])
                .select()
                .single();

            if (clientError) throw clientError;

            // 2. Create appointment
            const startTime = new Date(`${formData.date}T${formData.time}`);
            const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

            const { error: appointmentError } = await supabase
                .from('appointments')
                .insert([
                    {
                        client_id: clientData.id,
                        start_time: startTime.toISOString(),
                        end_time: endTime.toISOString(),
                        status: 'scheduled'
                    }
                ]);

            if (appointmentError) throw appointmentError;

            setSuccess(true);
        } catch (error) {
            console.error('Error booking:', error);
            alert('Помилка при записі. Спробуйте ще раз.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow text-center">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-bold mb-2">Запис успішний!</h2>
                <p className="text-gray-600 mb-6">Ми чекаємо на вас {formData.date} о {formData.time}.</p>
                <button
                    onClick={() => { setSuccess(false); setFormData({ ...formData, fullName: '', phone: '' }); }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Записати ще когось
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-indigo-600" />
                Запис на діагностику
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ваше ім'я</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            required
                            className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Іван Іванов"
                            value={formData.fullName}
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="tel"
                            required
                            className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="050 123 45 67"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
                        <input
                            type="date"
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Час</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                                className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                            >
                                <option value="10:00">10:00</option>
                                <option value="11:00">11:00</option>
                                <option value="12:00">12:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Запис...' : 'Записатися'}
                </button>
            </form>
        </div>
    );
}
