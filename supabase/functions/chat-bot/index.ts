import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { message } = await req.json();

        if (!OPENROUTER_API_KEY) {
            throw new Error('OPENROUTER_API_KEY is not set');
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://insoles-crm.com", // Optional, for OpenRouter rankings
            },
            body: JSON.stringify({
                "model": "openai/gpt-3.5-turbo", // Or "meta-llama/llama-3-8b-instruct:free" for free testing
                "messages": [
                    {
                        "role": "system",
                        "content": "Ти - корисний асистент Insoles CRM. Ти допомагаєш клієнтам дізнатися про ортопедичні устілки. Твій тон ввічливий та професійний. Устілки коштують від 3000 грн. Діагностика коштує 500 грн."
                    },
                    {
                        "role": "user",
                        "content": message
                    }
                ]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        return new Response(JSON.stringify({ reply }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
