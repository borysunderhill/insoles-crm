import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { topic } = await req.json();

        if (!OPENROUTER_API_KEY) {
            throw new Error('OPENROUTER_API_KEY is not set');
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://insoles-crm.com",
            },
            body: JSON.stringify({
                "model": "openai/gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "system",
                        "content": "Ти - SMM-експерт для бренду ортопедичних устілок. Напишіть привабливий пост для Instagram українською мовою. Використовуй емодзі. Тон: професійний, турботливий. Додай хештеги в кінці."
                    },
                    {
                        "role": "user",
                        "content": `Напиши пост на тему: ${topic || 'Переваги індивідуальних устілок'}`
                    }
                ]
            })
        });

        const data = await response.json();
        const postContent = data.choices[0].message.content;

        return new Response(JSON.stringify({ content: postContent }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
