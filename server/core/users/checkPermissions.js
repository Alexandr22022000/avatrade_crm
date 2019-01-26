module.exports = ({permissions}, req) => {
    let isOk = false;

    permissions.map((item) => {
        req.map((Ritem) => {
            if (item === Ritem) isOk = true;
        });
    });

    return isOk;
};