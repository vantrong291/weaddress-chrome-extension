export function getCookie(context, name) {
    return context.$cookies.get(name) || null
}

export function setCookie(context, name, value, options) {
    return context.$cookies.set(name, value, options)
}

export function removeCookie(context, name) {
    return context.$cookies.remove(name)
}

export function isExisted(context, name) {
    return context.$cookies.isKey(name)

}
