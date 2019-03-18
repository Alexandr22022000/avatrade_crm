const generateDoc = (pages) => `
<div>
    <style>
        .header h1, h2, h3 {
            margin-bottom: -15px;
        }
        
        .header {
            margin-left: 30px;
            margin-right: 30px;
        }

        .footer {
            margin: 10px 10px;
        }
        
        .notes {
            display: block;
            border: 2px solid black;
            width: 100%;
            height: 200px;
        }
        
        .content {
            height: 625px;
            padding: 30px 30px;
        }
        
        li {
            font-size: 30px;
            padding-bottom: 10px;
        }
        
        .checkbox {
            display: inline-block;
            border: 2px solid black;
            width: 30px;
            height: 30px;
            float: right;
            margin-top: 10px;
        }
        
        .stock {
            display: inline-block;
            font-size: 30px;
            margin-top: 10px;
        }
        
        .not_first_stock {
            border-top: 1px solid gray;
        }
    </style>
    <div>
        ${pages}
    </div>
</div>
`;

const generatePage = (stocks, store, address, sender, phone, index) => {
    let stocksHtml = '';
    stocks.forEach(stock => stocksHtml += stock);

    let startNum = index * 11 + 1;

    return `
    <div>
        <div class="header">
            <div style="display: inline-block">
                <h1>Ava-Trade</h1>
                <h3>Логистика</h3>
                <h3>${getDate()}</h3>
            </div>
            <div style="display: inline-block; float: right">
                <h1><< ${store} >></h1>
                <h3>${address}</h3>
                <h3>${sender + ', ' + phone}</h3>
            </div>
        </div>
        <div class="content">
            <ol start="${startNum}">
                ${stocksHtml}
            </ol>
        </div>
        <div class="footer">
            <h1 style="font-size: 20px">Премечание</h1>
            <div class="notes"></div>
        </div>
    </div>
    `;
};

const generateItem = (name, count, isFirst) => `
    <li${isFirst ? '' : ' class="not_first_stock"'}><h2 class="stock">${name + ' - '+ count}</h2><div class="checkbox"></div></li>
`;

const getDate = () => {
    let date = new Date();

    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let day = date.getDate();
    if (day < 10) day = '0' + month;

    return `${day}.${month}.${date.getFullYear()}`;
};

module.exports = (request) => {
    let pages = [],
        items = [];

    request.stocks.forEach(item => {
        const count = item.count - item.ready;
        if (count <= 0) return;

        item = generateItem(item.name, count, items.length === 0);
        items.push(item);

        if (items.length === 12) {
            pages.push(items);
            items = [];
        }
    });
    pages.push(items);

    let pagesHtml = '';
    pages = pages.forEach((stocks, index) => {
        pagesHtml += generatePage(stocks, request.store, request.address, request.sender, request.phone, index);
    });

    return generateDoc(pagesHtml);
};