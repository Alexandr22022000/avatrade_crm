module.exports = (date) => {
    return new Date(date.getTime() - ((date.getTimezoneOffset() / 60) * 60 * 60 * 1000) + 7*60*60*1000).getTime();
};