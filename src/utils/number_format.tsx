const number_format = (
    value: number | bigint | Intl.StringNumericLiteral,
    locale: string
): string => {
    const options: Intl.NumberFormatOptions = {
        notation: "standard",
        maximumFractionDigits: 3
    }
    const locales = locale === 'fa' ? 'fa-IR' : 'en-US';
    return Intl.NumberFormat(locales, options).format(value);
}

export default number_format;