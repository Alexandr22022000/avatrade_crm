module.exports = (data) => {
    let start = new Date(data),
        end = new Date(data),
        days = new Date(data);

    start.setDate(1);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);

    end.setMonth(end.getMonth() + 1);
    end.setDate(1);
    end.setHours(0);
    end.setMinutes(0);
    end.setSeconds(0);
    end.setMilliseconds(0);

    days.setMonth(days.getMonth() + 1);
    days.setDate(0);
    days = days.getDate();

    return {start, end, days};
};