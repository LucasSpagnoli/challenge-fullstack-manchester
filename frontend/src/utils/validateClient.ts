export function validateClient(name: string, number: string) {
    const errors: { name?: string; number?: string } = {};
    const trimmedName = name.trim();

    if (!trimmedName) errors.name = "Nome é obrigatório.";
    if (number.length !== 13) errors.number = "Número de celular inválido.";

    return { valid: Object.keys(errors).length === 0, errors };
}