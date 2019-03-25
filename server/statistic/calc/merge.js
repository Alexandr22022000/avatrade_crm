module.exports = (main, check, mainKey, checkKey, create) => {
    const used = check.map(() => false);

    check.forEach((checkItem, index) => {
        for (let key in main) {
            if (+main[key][mainKey] === +checkItem[checkKey]) {
                used[index] = true;
                return;
            }
        }
    });

    check.filter((i, index) => !used[index]).forEach(item => {
        main.push(create(item));
    });
};