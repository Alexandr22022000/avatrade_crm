const formatDate = (date, char='.') => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return `${day>9?'':'0'}${day}${char}${month>9?'':'0'}${month}${char}${year}`;
};

export default formatDate;
