This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Node.js](https://nodejs.org/en/).

## Get started

### Repository

Download and install node.js from [official site](https://nodejs.org/en/).

Clone this repository: ```git clone https://github.com/Alexandr22022000/avatrade_crm```

Install npm modules and dependencies: ```npm i```

### Database

Download and install PostgreSQL from [official site](https://www.postgresql.org/download/).

Download and install pgAdmin from [official site](https://www.pgadmin.org/download/).

Open pdAdmin and connect to local server (if still not connect).

In pdAdmin add new database in local server.

Clone database tool (in new folder): ```git clone https://github.com/Alexandr22022000/database-tools```

Copy file `database.backup` from this repository to root directory database tool.

Open file `tool.js` (in database tool) and replace `settings` to:

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

Replace `YOU DATABASE URL` to url new created database according to the scheme: ```postgres://user:password@host:port/database```

For example: ```postgres://postgres:0000@localhost:5432/avatrade_crm```

Run `node tool` in database tool root directory.

Create file `config.js` in this repository root directory (see `config_demo.js` for example).

Replace value `DATABASE_URL` to url new created database.

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

200 - Ok

401 - Unauthorized (incorrect or outdated token)

404 - Not found

500 - Internal server error 

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