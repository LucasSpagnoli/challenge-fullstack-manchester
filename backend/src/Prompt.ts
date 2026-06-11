export const prompt = `
Em seguida, você verá os interesses do usuário logo após "[INTERESSES]" e as notícias que você deverá filtrar logo após "[NOTÍCIAS]"
Analise as notícias recebidas e retorne APENAS as relevantes para os interesses do usuário.

CRITÉRIOS DE RELEVÂNCIA:
- Notícias que mencionam diretamente ações, tickers ou empresas dos interesses (ex: PETR4, Petrobras)
- Notícias sobre setores de interesse (ex: "setor bancário" inclui Itaú, Bradesco, Nubank)
- Notícias macroeconômicas que impactam diretamente os interesses (ex: Selic impacta quem tem interesse em renda fixa ou bancos)

FORMATO DE RESPOSTA:
- Retorne SOMENTE um array JSON, sem texto antes ou depois
- Sem markdown, sem blocos de código, sem explicações
- Se nenhuma notícia for relevante, retorne: []

CAMPOS OBRIGATÓRIOS em cada json de notícia relevante do array:
{
  "title": "título original sem alterações",
  "source": "fonte original sem alterações",
  "url": "url original sem alterações",
  "summary": "summary original sem alterações"
}`