
export default function isValid(s:string) {
    if (!s){return false}
    if (s.includes(' ')){return false}
    let url:URL;
    try {
        url = new URL('https://example.com' + s)
    } catch(_) {
        return false
    }
    return true
}