const prepareCalendar = item => {
    item.manager = item.name;
    item.values = item.values.map((value, index) => ({
        value,
        description: item.descriptions[index],
    }));
    delete item.name;
    delete item.calendar;
    delete item.user_id;
    delete item.descriptions;
    return item;
};

const prepareStaticCalendar = key => item => {
    return {
        id: item.id,
        manager: item.name,
        values: item.values.map(v => ({
            value: v[key],
            description: '',
        })),
    };
};

module.exports = (data) => {
    //prepare payments
    const payment = data.users.map((user, index) => {
        let salary = 500;

        let workdays = 0,
            sells = 0,
            resells = 0,
            premiums = 0;
        data.workdays[index].values.forEach(v => workdays += v);
        data.increase_kpi[index].values.forEach(v => premiums += v);
        data.decrease_kpi[index].values.forEach(v => premiums -= v);
        user.values.forEach(v => sells += v.sell);
        user.values.forEach(v => resells += v.resell);

        let salaryPay = salary * workdays,
            sellsPay = sells * 0.1,
            resellsPay = resells * 0.02,
            all = premiums + salaryPay + sellsPay + resellsPay;
        return {
            manager: user.name,
            id: data.payments[index].id,
            workdays,
            salary,
            salaryPay,
            sells,
            sellsPay,
            resells,
            resellsPay,
            premiums,
            all,
            paid: data.payments[index].value,
            needPay: all - data.payments[index].value,
        };
    });

    //prepare calendars
    data.workdays = data.workdays.map(prepareCalendar);
    data.increase_kpi = data.increase_kpi.map(prepareCalendar);
    data.decrease_kpi = data.decrease_kpi.map(prepareCalendar);
    const sellsCallendar = data.users.map(prepareStaticCalendar('sell'));
    const resellsCallendar = data.users.map(prepareStaticCalendar('resell'));

    //group calendars
    const workCalendars = [
        {
            title: "Смены",
            canEdit: true,
            managers: data.workdays,
        },
        {
            title: "Продажи",
            canEdit: false,
            managers: sellsCallendar,
        },
        {
            title: "Перезаказы",
            canEdit: false,
            managers: resellsCallendar,
        },
        {
            title: "Премии",
            canEdit: true,
            managers: data.increase_kpi,
        },
        {
            title: "-KPI",
            canEdit: true,
            managers: data.decrease_kpi,
        },
    ];

    return {payment, workCalendars};
};