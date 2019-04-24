const   {checkUser} = require('neuronex-login-backend'),
        {query}     = require('neuronex-pg'),
        {GET_SELLS, GET_SERVICES} = require('../../pSQL/sales');


const changeTimezone = (date) => {
    const timeZone = new Date();
    return date;
    //return +date - ((timeZone.getTimezoneOffset() / 60) * 60 * 60 * 1000) + 7*60*60*1000;
};


module.exports = (app) => {
    app.get('/api/v0.0/cashbox/sells', (req, res) => {
        const user = checkUser(req.query.token);
        if (!user) return res.status(401).end();

        let start = req.query.start;
        if (!start || isNaN(start))
            return res.status(403).end();


        let end = req.query.end;

        if (!end ||isNaN(end))
            return res.status(403).end();


        let manager_id = req.query.manager_id;

        if (isNaN(manager_id))
            manager_id = null

        let store_id = req.query.store_id;

        if (isNaN(store_id))
            store_id = null


        let search = req.query.search;


        if (!search || search.trim() === '' || search === 'null')
            search = null;
        else
            search = new RegExp(search.trim());

        query(GET_SELLS, [start, end, manager_id, store_id])
            .then(({rows})=> {
                query(GET_SERVICES)
                    .then(services => {
                        for (let key in rows) {
                            rows[key].id = changeTimezone(rows[key].id);

                           let _services = [];
                           if (rows[key].services.services)
                               for (let service of rows[key].services.services) {
                                   let thatService =  services.rows.find((value)=>(value.id === service.id));
                                   if (thatService) {
                                       service.name = thatService.name;
                                       service.re_sell = thatService.is_resell;
                                       delete service.price;
                                       delete service.consumables;
                                       _services.push(service);
                                   }
                               }
                            rows[key].services=_services;
                        }
                        if (search)
                            rows = rows.filter((value)=>{
                                for (let service of value.services)
                                {
                                    if (service.name.match(search))
                                        return true;
                                }
                                return false;
                            });
                        res.status(200).json(rows);
                    });
            });


    });
};