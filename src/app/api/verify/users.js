export function cleanValue(value) {
    return value.replace(/[^a-zA-Z0-9@. ]/g, '')
}
