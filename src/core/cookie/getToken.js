const getToken = () => {
    const cookie = document.cookie;
    const name = 'token';

    if(cookie.indexOf(name,0) === -1) {
        return 'none';
    } else {
        let start = cookie.indexOf(name, 0);
        let end = cookie.indexOf(';', start);
        let token;
        if(end === -1) {
            token = cookie.substring(start + name.length + 1, cookie.length);
        } else {
            token = cookie.substring(start, end);
        }

        return token;
    }
};

export default getToken;