export function validateClient(name: string, number: string) {
    const errors: { name?: string; number?: string } = {};
    const trimmedName = name.trim();
    const digits = number.replace(/\D/g, "");

    if (!trimmedName) errors.name = "Nome é obrigatório.";
    if (digits.length !== 11) errors.number = "Número de celular inválido.";

    return { valid: Object.keys(errors).length === 0, errors };
}