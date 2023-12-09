/*
 * Đang rất cay khi phải viết các hàm này Giang m hết trò để làm rồi à, cứ nghĩ đủ trò điên điên không 😡😡😡??
 */
export const toGMT7 = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}+07:00`
}


/*
 * 😡😡😡 Lúc mời làm kêu tất cả server dùng giờ quốc tế hay lắm mà 😊 sao giờ bắt làm cái trò này.
 * Không làm được thì lúc đầu đừng nói
 */
export const parseGMT7 = (date: string) => {
    return new Date(date.replace("+07:00", ""))
}

export const subtractDate = (date: Date, day: number): Date => {
    const subtractDate = new Date(date.getTime())
    subtractDate.setDate(subtractDate.getDate() - day)
    return subtractDate
}