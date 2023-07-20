// Sanitize function
// Remove possible html element insertion
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

// Date Format function
// Returns a date like Jul 19, 2023, 9:42 AM
export const dateDisplay = (date: Date): string => {
    let sanitizedDate = new Date(date)      // failsafe in case it receives a string instead of a date object
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