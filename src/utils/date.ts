export const parseAndPlusGMT7 = (value: string) => {
    const date = new Date(value)
    return new Date(date.getTime() + (7 * 3600 * 1000))
}

export const toGMT7 = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}+07:00`
}

export const parseGMT7 = (date: string) => {
    return new Date(date.replace("+07:00", ""))
}

export const subtractDate = (date: Date, day: number): Date => {
    const subtractDate = new Date(date.getTime())
    subtractDate.setDate(subtractDate.getDate() - day)
    return subtractDate
}