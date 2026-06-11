export const prompt = `
Em seguida, você verá os interesses do usuário logo após "[INTERESSES]" e as notícias que você deverá filtrar logo após "[NOTÍCIAS]"
Sua tarefa é analisar uma lista de notícias e retornar APENAS as que são relevantes para os interesses do usuário.

REGRAS:
- Retorne somente notícias que tenham relação direta com os interesses listados
- Se uma notícia mencionar uma ação, setor ou tema dos interesses, inclua-a
- Ignore notícias que não têm nenhuma relação com os interesses (ex: esportes, política sem impacto financeiro)
- Se nenhuma notícia for relevante, retorne um array vazio

Responda SOMENTE com um JSON válido, sem texto adicional, sem markdown, sem blocos de código. Exatamente neste formato:
[
  {
    "title": "título original da notícia (title)",
    "source": "fonte original (source)",
    "url": "url original (url)",
    "summary": "resumo personalizado explicando a relevância para o interesse do usuário (summary original)",
  }
]`