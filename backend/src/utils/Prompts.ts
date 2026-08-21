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
Analise os títulos e descrições para elaborar uma síntese que siga a seguinte estrutura:
[síntese (explicação abaixo de como fazer esta síntese) de uma das notícias em no máximo 200 caracteres (caso venha apenas uma notícia, pode usar 300 caracteres), pondo a frase principal da notícia entre asteriscos]
[fonte da notícia]
pula linha
[síntese da notícia 2, e assim até acabarem as notícias].
pula linha
[Data de hoje, por último]
A síntese da notícia *você* vai fazer, levando em conta principalmente a descrição da notícia, destacando o que é importante. Lembre de usar o máximo de caracteres permitidos possível.
Abstenha-se de prolixidade e introduções, apenas envie o resumo direto. Caso você não tenha alguma informação, me informe.
Utilize linguagem simples, clara e simpática.
`.trim();