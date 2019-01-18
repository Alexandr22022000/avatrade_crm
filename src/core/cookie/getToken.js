const getToken = () => {
    const cookie = document.cookie;
    const name = 'token';

    if(cookie.indexOf(name,0) === -1) {
        return {token: 'none'};
    } else {
        let start = cookie.indexOf(name, 0);
        let end = cookie.indexOf(';', start);
        let token;
        if(end === -1) {
            token = cookie.substring(start, cookie.length);
        } else {
            token = cookie.substring(start, end);
        }

        return {token: token};
    }
};

export default getToken;