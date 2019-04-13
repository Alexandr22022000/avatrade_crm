This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Node.js](https://nodejs.org/en/).



## Get started

### Repository

1) Download and install node.js from [official site](https://nodejs.org/en/).

2) Clone this repository: ```git clone https://github.com/Alexandr22022000/avatrade_crm```

3) Install npm modules and dependencies: ```npm i```

### Database

1) Download and install PostgreSQL from [official site](https://www.postgresql.org/download/).

2) Download and install pgAdmin from [official site](https://www.pgadmin.org/download/).

3) Open pdAdmin and connect to local server (if still not connect).

4) In pdAdmin add new database in local server.

5) Clone database tool (in new folder): ```git clone https://github.com/Alexandr22022000/database-tools```

6) Copy file `database.backup` from this repository to root directory database tool.

7) Open file `tool.js` (in database tool) and replace `settings` to:

    ```$xslt
    settings = {
            mode: MODE.LOAD,
            dataType: DATA_TYPE.ALL,
            srcDatabase: '',
            distDatabase: 'YOU DATABASE URL',
            filename: 'database.backup',
            needCompress: true,
            key: null,
            needCrypto: false,
            srcClean: CLEAN.NONE,
            distClean: CLEAN.ALL,
            ignoreErrors: false
        };
    ```

8) Replace `YOU DATABASE URL` to url new created database according to the scheme: ```postgres://user:password@host:port/database```

    For example: ```postgres://postgres:0000@localhost:5432/avatrade_crm```

9) Run `node tool` in database tool root directory.

10) Create file `config.js` in this repository root directory (see `config_demo.js` for example).

11) Replace value `DATABASE_URL` to url new created database.

Done! You connected database to this project and you can change database data in pgAdmin!

### Available Scripts

#### `npm run start`

Runs app frontend on development server.

#### `npm run build`

Creates production build in `build` folder.

#### `node server`

Runs production server. Can be used for test API.

## API

### Statuses

- 200 - Ok

- 401 - Unauthorized (incorrect or outdated token)

- 403 - Forbidden (not enough permissions)

- 404 - Not found

- 409 - Conflict

- 500 - Internal server error 

### Core:

#### `POST: /api/v0.0/login`

Request body:

```$xslt
login: text
password: text
```

Response body:

```$xslt
token: text
permissions: integer[]
```

#### `GET: /api/v0.0/permissions`

Request params:

```$xslt
token: text
```

Response body:

```$xslt
permissions: integer[]
```

### Users:

#### `GET: /api/v0.0/users`

Request params:

```$xslt
token: text,
is_all: bool (optional)
```

Response body:

```$xslt
users: [
    {
        id: bigint,
        name: text,
        rank: text,
        phone: text
    }
]
```

#### `GET: /api/v0.0/user`

Request params:

```$xslt
token: text,
id: bigint
```

Response body:

```$xslt
user: {
    id: bigint,
    email: text,
    name: text,
    rank: bigint,
    phone: text,
    permissions: integer[],
    address: text,
    vk: text,
    status: bigint,
    docs: text[]
},
ranks: [
    id: bigint,
    name: text
]
```

#### `POST: /api/v0.0/user`

Request body:

```$xslt
token: text,
id: bigint,
email: text,
name: text,
rank: bigint,
phone: text,
permissions: integer[],
address: text,
vk: text,
docs: text[]
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/add_user`

Request body:

```$xslt
token: text,
email: text,
name: text,
rank: bigint,
phone: text,
permissions: integer[],
address: text,
vk: text,
docs: text[]
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/user_status`

Request body:

```$xslt
token: text,
id: bigint,
status: text
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/start_recover_password`

Request body:

```$xslt
email: text
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/recover_password`

Request body:

```$xslt
token: text,
password: text
```

Response body:

```$xslt

```

#### `GET: /api/v0.0/users/ranks`

Request params:

```$xslt
token: text
```

Response body:

```$xslt
ranks: [
    {
        id: bigint,
        name: text,
        payment: number,
        status: number,
    {
]
```

#### `POST: /api/v0.0/users/rank`

Request body:

```$xslt
token: text,
id: number,
name: text,
payment: number,
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/users/add_rank`

Request body:

```$xslt
token: text,
name: text,
payment: number,
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/users/rank/status`

Request body:

```$xslt
token: text,
id: number,
status: number,
```

Response body:

```$xslt

```

### Cargos:

#### `GET: /api/v0.0/stocks` (deprecated)

Request params:

```$xslt
token: text,
is_all: bool, (optional) 
store: integer, (optional)
search: text (optional)
```

Response body:

```$xslt
stocks: [
    {
        id: bigint,
        count: integer,
        name: text,
        article: text, 
        store: rext,
        cargo_id: bigint,
        store_id: bigint,
    }
]
```

#### `GET: /api/v0.1/stocks`

Request params:

```$xslt
token: text,
is_all: bool, (optional) 
is_del: bool, (optional)
search: text (optional)
```

Response body:

```$xslt
stocks: [
        {
            id: bigint,
            name: text,
            article: text,
            stocks: [
                {
                    count: number,
                    store_id: bigint,
                    store: text
                }
            ]
        }
    ]
```

#### `GET: /api/v0.0/cargos`

Request params:

```$xslt
token: text,
```

Response body:

```$xslt
cargos: [
    {
        id: bigint,
        name: text,
        article: text,
        status: number
    }
]
```

#### `POST: /api/v0.0/set_cargo`
Request params:
```$xslt
token: text,
id: bigint,
name: text,
article: text
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/cargo/status`
Request params:
```$xslt
token: text,
id: bigint,
status: integer
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/add_stocks`

Request body:

```$xslt
token: text,
count: integer,
cargo: integer
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/cargo`

Request body:

```$xslt
token: text,
id: nimber,
name: text,
article: text,
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/add_stocks`

Request body:

```$xslt
token: text,
count: integer,
name: text,
article: text
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/migrate`

Request body:

```$xslt
token: text,
from: integer,
to: integer,
stocks: [
    {
        id: integer,
        count: integer
    }
]
```

Response body:

```$xslt

```

#### `GET: /api/v0.0/migrates`

Request params:

```$xslt
token: text
```

Response body:

```$xslt
migrate: [
    {
        id: bigint,
        from_id: bigint,
        to_id: bigint,
        from: text,
        to: text,
        sender_id: bigint,
        sender: text,
        stocks: [
            {
                id: bigint,
                count: integer,
                name: text,
                article: text
            }
        ]
    }
]
```

#### `GET: /api/v0.0/migrate` 

Request params:

```$xslt
token: text,
id: number
```

Response body:

```$xslt
id: bigint,
from_id: bigint,
to_id: bigint,
from: text,
to: text,
sender_id: bigint,
sender: text,
stocks: [
    {
        id: bigint,
        count: integer,
        name: text,
        article: text
    }
]
```

#### `POST: /api/v0.0/approve_migrate`

Request body:

```$xslt
token: text,
id: integer
```

Response body:

```$xslt

```

### Migrates request:

#### `POST: /api/v0.0/add_migrate_request` 

Request params:

```$xslt
token: text,
to_id: bigint,
stocks: [
    {
        id: bigint,
        count: integer
    }
]
```

Response body:

```$xslt

```

#### `GET: /api/v0.0/migrate_requests` 

Request params:

```$xslt
token: text
```

Response body:

```$xslt
migrate_requests: [
    {
        id: bigint,
        to_id: bigint,
        to: text,
        sender_id: bigint,
        sender: text,
        stocks: [
            {
                id: bigint,
                count: integer,
                name: text,
                article: text
            }
        ]
    }
]
```

#### `GET: /api/v0.0/migrate_request` 

Request params:

```$xslt
token: text,
id: number
```

Response body:

```$xslt
id: bigint,
to_id: bigint,
to: text,
sender_id: bigint,
sender: text,
stocks: [
    {
        id: bigint,
        count: integer,
        name: text,
        article: text
    }
]
```

### Notifications

#### `GET: /api/v0.0/notifications` 

Request params:

```$xslt
token: text
```

Response body:

```$xslt
alerts: [
    {
        id: bigint,
        type: number,
        title: text,
        text: text
    }
}
```

### Stores:

#### `GET: /api/v0.0/stores`

Request params:

```$xslt
token: text,
```

Response body:

```$xslt
stores: [
    {
        id: bigint, 
        address: rext,
    }
]
```

#### `POST: /api/v0.0/add_store`

Request params:

```$xslt
token: text,
name: text,
address: text
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/store`

Request params:

```$xslt
token: text,
id: integer,
name: text,
address: text,
status: integer
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/store_status`

Request params:

```$xslt
token: text,
id: integer,
status: integer,
```

Response body:

```$xslt

```

### Services:

#### `GET: /api/v0.0/services` 

Request params:

```$xslt
token: text,
search: text, (optional)
is_product: bool, (optional)
is_del: bool (optional)
```

Response body:

```$xslt
services: [
    {
        id: bigint, 
        name: text,
        price: number,
        is_product: bool,
        status: number,
        is_resell: bool,
        consumables: [
            {
                id: bigint,
                count: num,
                name: text,
                article: text
            }
        ]
    }
]
```

#### `POST: /api/v0.0/add_services`

Request params:

```$xslt
token: text,
name: text,
price: number,
is_product: bool,
consumables: [
    {
        id: bigint,
        count: num
    }
]
```

Response body:

```$xslt

```

#### `POST: /api/v0.1/add_services` 

Request params:

```$xslt
token: text,
name: text,
price: number,
is_product: bool,
is_resell: bool,
consumables: [
    {
        id: bigint,
        count: num
    }
]
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/services`

Request params:

```$xslt
token: text,
id: number,
name: text,
price: number,
is_product: bool,
consumables: [
    {
        id: bigint,
        count: num
    }
]
```

Response body:

```$xslt

```

#### `POST: /api/v0.1/services` 

Request params:

```$xslt
token: text,
id: number,
name: text,
price: number,
is_product: bool,
is_resell: bool,
consumables: [
    {
        id: bigint,
        count: num
    }
]
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/services_status`

Request params:

```$xslt
token: text,
id: number,
status: number
```

Response body:

```$xslt

```

### CashBox:

#### `POST: /api/v0.0/sale`

Request params:

```$xslt
token: text,
store: number,
is_card: bool,
services: [
    {
        id: number,
        count: number   
    }
]
```

Response body:

```$xslt

```

#### `GET: /api/v0.0/fast_services`

Request params:

```$xslt
token: text
```

Response body:

```$xslt
fast_services: [
    {
        id: bigint,
        name: text,
        price: number,
        is_product: bool,
        consumables: [
            {
                id: number,
                count: number,
                name: text,
                article: text
            }
        ]
    }
]
```

#### `POST: /api/v0.0/fast_services`

Request body:

```$xslt
token: text
fast_services: [number]
```

Response body:

```$xslt

```

#### `POST: /api/v0.0/collection`

Request body:

```$xslt
token: text,
store_id: number,
value: number,
```

Response body:

```$xslt

```

#### `GET: /api/v0.0/cashbox/sells` (in developing)

Request params:

```$xslt
token: text,
start: number,
end: number,
manager_id: number, (optional)
store_id: number, (optional)
search: text, (optional)
```

Response body:

```$xslt
sells: [
    {
        date: bigint,
        store: text,
        store_id: bigint,
        manager: text,
        manager_id: bigint,
        price: number,
        services: [
            {
                id: bigint,
                name: text,
                count: number,
                re_sell: bool,
            }
        ]
    }
]
```

### Statistic

#### `GET: /api/v0.0/statistic`

Request params:

```$xslt
token: text
date: number
```

Response body:

```$xslt
turnover: [
    {
        name: text,
        startValue: number,
        endValue: number,
        turnoverValue: number,
        values: [
            {
                pco: number,                
                acquiring: number,                
                account: number,                
                rco: number,                
            },
        ],
    },
],
workCalendars: [
    title: text,
    canEdit: bool,
    managers: [
        {
            manager: text,
            id: number,
            values: [
                {
                    value: number,
                    description: text,
                },
            ],
        },
    ],
],
payment: [
    {
        id: bigint,
        manager: text,
        workDays: number,
        salary: number,
        salaryPay: number,
        sells: number,
        sellsPay: number,
        resells: number,
        resellsPay: number,
        all: number,
        premiums: number,
        paid: number,
        needPay: number,
    },
],
```

#### `POST: /api/v0.0/statistic/calendar`

Request body:
```$xslt
token: text,
id: number,
values: [
    {
        value: number,
        description: text,
    }
]
```

Response body:
```$xslt

```

#### `POST: /api/v0.0/statistic/payment`

Request body:
```$xslt
token: text,
id: number,
paid: number,
```

Response body:
```$xslt

```

### Planning

#### `GET: /api/v0.0/planning/orders` (in developing)

Request params:
```$xslt
token: text,
start: number, (optional)
end: number, (optional)
manager_id: number, (optional)
store_id: number, (optional)
status: number, (optional)
type: number, (optional)
search: text, (optional)
```

Response body:
```$xslt
orders: [
    {
        date: bigint,
        customer: text, 
        contacts: text,
        ready: bigint,
        store: text,
        store_id: bigint,
        return_store: text,
        return_store_id: bigint,
        manager: text,
        manager_id: bigint,
        name: text,
        description: text,
        price: number,
        paid: number,
        note: text,
        status: number,
        type: number,
    }
]
```

#### `POST: /api/v0.0/planning/order` (in developing)

Request params:
```$xslt
token: text,
id: bigint,
customer: text, 
contacts: text,
ready: bigint,
store_id: bigint,
return_store_id: bigint,
manager_id: bigint,
name: text,
description: text,
price: number,
paid: number,
note: text,
status: number,
type: number,
```

Response body:
```$xslt

```

#### `POST: /api/v0.0/planning/add_order` (in developing)

Request params:
```$xslt
token: text,
customer: text, 
contacts: text,
ready: bigint,
store_id: bigint,
return_store_id: bigint,
name: text,
description: text,
price: number,
paid: number,
note: text,
type: number,
```

Response body:
```$xslt

```

## Constants

### Permissions list

- Owner: 0
- Store manager: 1
- warehouse manager: 2
- Top manager: 3

### User statuses

- Active: 0
- Fired: 1

### Store statuses

- Active: 0
- Closed: 1

### Services statuses

- Active: 0
- Deleted: 1

### Notifications types

- Migration: 0
- Migration request: 1

### Cargos statuses

- Active: 0
- Deleted: 1

### Orders statuses

- Ready to work: 0
- Working: 1
- Ready on making: 2
- Transporting: 3
- Ready on store: 4
- Done: 5
- Cancel: 6
- Disgusting: 7
- On Yandex: 8
- Calculating: 9
- Calculating done: 10
- Customer in notified: 11

### Orders types

- Yellow (Only making): 0
- Dark blue (Only manager): 1
- Orange (Calculating): 2
- Blue (Reorder): 3
- Purple (Part Reorder): 4
- Pink (Design): 5