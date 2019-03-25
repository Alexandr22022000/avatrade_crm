module.exports = (days, participants, create, addTransaction, keyV) => {
    if (!keyV) keyV = 'store_id';
    days.forEach(day => {
        day.values.forEach(value => {
            let participantIndex = -1;
            for (let key in participants) {
                if (participants[key].id === value[keyV]) {
                    participantIndex = key;
                    break;
                }
            }
            if (participantIndex === -1) {
                participants.push(create(value));
                participantIndex = participants.length - 1;
            }

            addTransaction(participants[participantIndex], value, day.day);
        });
    });
};