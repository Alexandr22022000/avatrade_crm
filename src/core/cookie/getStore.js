import cookies from "client-cookies";

const getStore = () => {
    return cookies.get('store');

    /*const cookie = document.cookie;
    const name = "store";

    if (cookie.indexOf(name, 0) === -1) {
        return null;
    } else {
        let start = cookie.indexOf(name, 0);
        let end = cookie.indexOf(";", start);
        let token;
        if (end === -1) {
            token = cookie.substring(start + name.length + 1, cookie.length);
        } else {
            token = cookie.substring(start, end);
        }
        if (token === "none") {
            return null;
        }
        return token;
    }*/
};

export default getStore;
