const checkDate = (date) => {
    return `${date>9?'':'0'}${date}`;
};

const formatDate = (date, char='.') => {
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    return `${checkDate(day)}${char}${checkDate(month)}${char}${year}`;
};

export const formatDateTime = (date, charDate='.', charTime=':') => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${formatDate(date,charDate)} ${checkDate(hours)}${charTime}${checkDate(minutes)}`;
};


export default formatDate;