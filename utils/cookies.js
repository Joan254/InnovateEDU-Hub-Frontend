// Function to delete a cookie
export function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}