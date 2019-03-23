const get_services = require('./v0.0/get_services'),
    add_services = require('./v0.0/add_service'),
    services_status = require('./v0.0/service_status'),
    add_service_0_1 = require('./v0.1/add_service'),
    set_service_0_1 = require('./v0.1/set_service'),
    set_service = require('./v0.0/set_service');

module.exports = (app) => {
        get_services(app);
        add_services(app);
        services_status(app);
        set_service(app);
        add_service_0_1(app);
        set_service_0_1(app);
};