export const parseAndPlusGMT7 = (value: string) => {
    const date = new Date(value)
    return new Date(date.getTime() + (7 * 3600 * 1000))
}