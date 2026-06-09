export function summaryFormatter(summary: string) {
    // summary do infomoney vem em um html enorme, o regex abaio serve pra tirar esses elementos html
    // já o segundo replace, tira a segunda parte da descrição do summary, que é um texto padronizado falando que o post apareceu primeiro no infomoney
    const formated = (summary ? summary.replace(/<[^>]*>/g, '').trim().replace(/\nThe post[\s\S]*/i, '') : '')
    return formated
}