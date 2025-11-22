import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Instagram, Wand2, Copy, Check } from 'lucide-react';

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
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Instagram className="h-8 w-8 text-pink-600" />
                Маркетинг & SMM
            </h1>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Генератор постів</h2>
                <p className="text-gray-600 mb-4 text-sm">
                    Введіть тему, і AI напише готовий пост для Instagram з емодзі та хештегами.
                </p>

                <form onSubmit={handleGenerate} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Наприклад: Чому болять ноги після роботи?"
                        className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        type="submit"
                        disabled={loading || !topic.trim()}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 font-medium"
                    >
                        {loading ? (
                            'Пишу...'
                        ) : (
                            <>
                                <Wand2 className="h-4 w-4" />
                                Згенерувати
                            </>
                        )}
                    </button>
                </form>

                {generatedPost && (
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 relative group">
                        <button
                            onClick={copyToClipboard}
                            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-indigo-600 bg-white rounded-md shadow-sm border border-gray-200 transition-all"
                            title="Копіювати"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </button>
                        <div className="whitespace-pre-wrap text-gray-800 font-sans text-sm leading-relaxed">
                            {generatedPost}
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100">
                    <h3 className="font-semibold text-purple-900 mb-2">Ідеї для постів</h3>
                    <ul className="list-disc list-inside text-sm text-purple-800 space-y-1">
                        <li>Як вибрати перші устілки?</li>
                        <li>Плоскостопість у дітей: на що звернути увагу?</li>
                        <li>Чому болить спина від взуття?</li>
                        <li>Спорт і устілки: як покращити результати?</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
