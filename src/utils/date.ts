export const parseAndPlusGMT7 = (value: string) => {
    const date = new Date(value)
    return new Date(date.getTime() + (7 * 3600 * 1000))
}

export const subtractDate = (date: Date, day: number): Date => {
    const subtractDate = new Date(date.getTime())
    subtractDate.setDate(subtractDate.getDate() - day)
    return subtractDate
}