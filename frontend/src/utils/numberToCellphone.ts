export const numberToCellphone = (input: string): string => {
    const digits = input.replace(/\D/g, "");

    if (digits.length < 11) return digits;
    if (digits.length === 11) return `+55${digits}`; 
    if (digits.length === 13 && digits.startsWith("55")) return `+${digits}`;

    return digits; 
};