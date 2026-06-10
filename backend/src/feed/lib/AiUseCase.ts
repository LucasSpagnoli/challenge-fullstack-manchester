export async function AiUseCase({ url, message }) {
    const apiKey = process.env.AI_API_KEY || ''
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: 'claude-opus-4-5',
            max_tokens: 1024,
            system: process.env.SYSTEM_PROMPT ?? 'Você é um assistente prestativo.',
            messages: [
                { role: 'user', content: message }
            ],
        }),
    });

    return response.json()
}