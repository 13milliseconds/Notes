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