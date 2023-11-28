const REGEX = {
    PASSPORT: /^[A-Z]\d{7}$/,
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#]).{8,}$/,
    username: /^[a-zA-Z0-9]+$/,
    notBlank: /\S+/,
    personalPhone: /84[35789]\d{8}/,
    number: /^(0|([1-9]\d*))$/,
    phoneNumber: /\d$/,
    textNumber: /^\d+$/
}

export default REGEX