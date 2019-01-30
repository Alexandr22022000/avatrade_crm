export const getTokenFromUrl = () => {
    const url = document.location.href;
    const name = 'token';
    if(url.indexOf(name,0) !== -1) {
        return url.substring(url.indexOf(name,0)+name.length + 1,url.length);
    }
    return null;
};