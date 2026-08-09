export const formatToday = () =>
    new Date()
        .toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
        .toUpperCase();