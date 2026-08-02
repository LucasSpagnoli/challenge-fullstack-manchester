export const cellphoneToNumber = (phone: string): string => {
    if (!phone) return "";

    const digits = phone.replace(/\D/g, "");
    const match = digits.match(/(\d{2})(\d{5})(\d{4})$/);

    if (!match) return phone;

    return `+55 (${match[1]}) ${match[2]}-${match[3]}`;
};