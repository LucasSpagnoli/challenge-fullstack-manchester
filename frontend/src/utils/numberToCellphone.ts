export const numberToCellphone = (input: string): string => {
    // 1. LIMPEZA INICIAL
    // Remove qualquer caractere que não seja número (parênteses, traços, espaços e o '+').
    // Ex: "+55 (55) 9976-8304" vira "555599768304"
    const digits = input.replace(/\D/g, ""); 

    // 2. REMOÇÃO DO CÓDIGO DO PAÍS (Se presente)
    // Um celular brasileiro com código do país tem 12 ou 13 dígitos:
    // - 12 dígitos: 55 (País) + 55 (DDD) + 8 dígitos (sem o 9)
    // - 13 dígitos: 55 (País) + 55 (DDD) + 9 dígitos (com o 9)
    // Se começar com "55" E tiver 12 ou 13 dígitos, cortamos os dois primeiros.
    // Obs: Isso impede que a função corte um número local do Rio Grande do Sul (DDD 55) que foi digitado sem o código do país (pois este terá 10 ou 11 dígitos).
    let number = (digits.startsWith("55") && (digits.length === 12 || digits.length === 13))
        ? digits.slice(2)
        : digits;

    // 3. INJEÇÃO DO NONO DÍGITO (Se ausente)
    // Após remover o código do país, se o número tiver 10 dígitos (DDD + 8 dígitos),
    // significa que é um celular antigo/sem o nono dígito.
    // Usamos o slice(0, 2) para pegar o DDD e injetamos o "9" antes do restante do número.
    // Ex: "5599768304" vira "55" + "9" + "99768304" -> "55999768304"
    if (number.length === 10) {
        number = number.slice(0, 2) + "9" + number.slice(2);
    }

    // 4. VALIDAÇÃO DE INTEGRIDADE
    // Após todas as tratativas acima, um celular brasileiro válido DEVE ter obrigatoriamente
    // 11 dígitos (2 do DDD + 9 do celular). Se não tiver, o input é inválido (ex: telefone fixo ou número incompleto).
    // Nesse caso, retornamos a string limpa original para o backend rejeitar, em vez de enviar um formato corrompido para o WhatsApp.
    if (number.length !== 11) {
        return digits;
    }

    // 5. PADRONIZAÇÃO FINAL
    // Retorna o formato exato exigido pela Evolution API / WhatsApp:
    // Prefixo "55" + DDD + Nono Dígito + Número
    // Ex: "5555999768304"
    return `55${number}`;
};