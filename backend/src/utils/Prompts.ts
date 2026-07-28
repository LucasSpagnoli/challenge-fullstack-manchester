export const filterPrompt = `
Em seguida, você verá os interesses do usuário logo após "[INTERESSES]" e os títulos das notícias numerados logo após "[NOTÍCIAS]".
Analise os títulos e retorne APENAS os números das notícias relevantes para os interesses do usuário.

CRITÉRIOS DE RELEVÂNCIA:
- Notícias que mencionam diretamente ações, tickers ou empresas dos interesses (ex: PETR4, Petrobras)
- Notícias sobre setores de interesse (ex: "setor bancário" inclui Itaú, Bradesco, Nubank)
- Notícias macroeconômicas que impactam diretamente os interesses (ex: Selic impacta quem tem interesse em renda fixa ou bancos)

FORMATO DE RESPOSTA:
- Retorne SOMENTE os números separados por espaço (ex: 1 3 7)
- Sem texto adicional, sem explicações, sem markdown
- Se nenhuma notícia for relevante, retorne: -1`

export const summaryPrompt = `
Em seguida, sob a demarcação "[NOTÍCIAS]", constam notícias recentes. 
Analise os títulos e descrições para elaborar uma síntese coesa e rigorosamente objetiva, extraindo estritamente a essência factual de cada item. 
Abstenha-se de preâmbulos, comentários supérfluos ou prolixidade.
`.trim();