export const numberToCellphone = (input: string): string => {
    const digits = input.replace(/\D/g, "");

    const withoutCountryCode =
        digits.length === 13 && digits.startsWith("55")
            ? digits.slice(2)
            : digits;

    if (withoutCountryCode.length !== 11) {
        return digits;
    }

    return `55${withoutCountryCode}`;
};