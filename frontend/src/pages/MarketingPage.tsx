import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Instagram, Wand2, Copy, Check, Sparkles } from 'lucide-react';

export function MarketingPage() {
    const [topic, setTopic] = useState('');
    const [generatedPost, setGeneratedPost] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setLoading(true);
        setGeneratedPost('');
        setCopied(false);

        try {
            const { data, error } = await supabase.functions.invoke('generate-post', {
                body: { topic }
            });

            if (error) throw error;

            setGeneratedPost(data.content);
        } catch (error) {
            console.error('Error generating post:', error);
            alert('Помилка при генерації. Спробуйте ще раз.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPost);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <Instagram className="w-64 h-64" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Sparkles className="h-8 w-8 text-yellow-300" />
                        AI Маркетолог
                    </h1>
                    <p className="text-pink-100 text-lg max-w-xl">
                        Створюйте професійний контент для Instagram за лічені секунди.
                        Просто напишіть тему, а штучний інтелект зробить решту.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Generator Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Wand2 className="h-5 w-5 text-indigo-600" />
                                Генератор постів
                            </h2>
                        </div>

                        <div className="p-6 space-y-6">
                            <form onSubmit={handleGenerate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Про що хочете написати?
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            placeholder="Наприклад: Переваги індивідуальних устілок для бігу"
                                            className="block w-full rounded-xl border-gray-200 pl-4 pr-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !topic.trim()}
                                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                            Пишу креативний пост...
                                        </span>
                                    ) : (
                                        'Згенерувати магію ✨'
                                    )}
                                </button>
                            </form>

                            {generatedPost && (
                                <div className="mt-8 animate-fade-in">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-500">Результат:</span>
                                        <button
                                            onClick={copyToClipboard}
                                            className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="h-4 w-4" /> Скопійовано
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-4 w-4" /> Копіювати текст
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-gray-800 whitespace-pre-wrap leading-relaxed font-sans">
                                        {generatedPost}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Ideas */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
                        <h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                            💡 Ідеї для контенту
                        </h3>
                        <ul className="space-y-3">
                            {[
                                'Топ-5 міфів про плоскостопість',
                                'Як доглядати за устілками?',
                                'Чому болять коліна при бігу?',
                                'Дитяче взуття: поради ортопеда',
                                'Знижка для підписників'
                            ].map((idea, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => setTopic(idea)}
                                        className="w-full text-left text-sm text-indigo-700 hover:text-indigo-900 hover:bg-white/50 p-2 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                                        {idea}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-2">Статистика</h3>
                        <div className="text-sm text-gray-500">
                            <p>Згенеровано постів: <span className="font-bold text-gray-900">12</span></p>
                            <p>Зекономлено часу: <span className="font-bold text-gray-900">~4 години</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
