import { createClient } from '@supabase/supabase-js';

// Отримуємо змінні середовища, які ви додали в .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

// Створюємо клієнт для з'єднання з базою даних
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
