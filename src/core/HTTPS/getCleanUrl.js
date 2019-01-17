const deleteSymbols = (url, symbol) => {
    let symbolIndex = url.indexOf(symbol, 9);
    if(symbolIndex !== -1) {
        return url.substring(0, symbolIndex);
    }
    return url;
};

const getCleanUrl = () => {
    let url = window.location.href;
    if(url.indexOf('localhost:3000', 0) !== - 1)
        return 'http://localhost:4000';
    url = deleteSymbols(url, '#');
    url = deleteSymbols(url, '/');
    return url;
};

export default getCleanUrl;