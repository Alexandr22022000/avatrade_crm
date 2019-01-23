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

- 500 - Internal server error 

### Core:

#### `POST: /api/v0.0/login`

Request body:

```$xslt
login: string
password: string
```

Response body:

```$xslt
token: string
permissions: integer[]
```

#### `GET: /api/v0.0/permissions`

Request headers:

```$xslt
token: string
```

Response body:

```$xslt
permissions: integer[]
```

### Users:

#### `GET: /api/v0.0/users`

Request headers:

```$xslt
token: string,
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

Request headers:

```$xslt
token: string,
id: bigint
```

Response body:

```$xslt
user: {
    email: text,
    name: text,
    rank: bigint,
    phone: text,
    permissions: integer[],
    address: text,
    vk: text,
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
token: string,
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
token: string,
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
token: string,
id: bigint,
status: integer
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
