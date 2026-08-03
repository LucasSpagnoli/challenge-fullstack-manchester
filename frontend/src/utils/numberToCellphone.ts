export const numberToCellphone = (input: string): string => {
    const digits = input.replace(/\D/g, "");

    const withoutCountryCode = digits.replace(/^(55)/, "");

    if (withoutCountryCode.length !== 11) {
        return digits;
    }

    return `55${withoutCountryCode}`;
};