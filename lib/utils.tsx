 export const sanitize = (str: string) => {
    const map:{[key: string] : string} = {
        '&': '&',
        '<': '<',
        '>': '>',
        '"': '"',
        "'": "'",
    }

    const reg = /[&<>"']/gi

    return str.replace(reg, (match) => {
        return map[match]
    })
}

export const dateDisplay = (date: Date): string => {
    let sanitizedDate = new Date(date)
    let formatter = Intl.DateTimeFormat(
        "default",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        }
    );
    return formatter.format(sanitizedDate)
}