const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceHtml = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(data => slugify(data.productName, { lower: true }));

const server = http.createServer((req, res) => {
    const pathName = req.url;
    const { query, pathname } = url.parse(req.url, true);
    //Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardsHtml = dataObj.map(data => replaceHtml(tempCard, data));
        let output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);
    }

    //Product page
    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id]
        const output = replaceHtml(tempProduct, product);
        res.end(output);
    }

    //API page
    else if (pathname === '/api') {
        res.end('This is the API');
    }

    //Not found
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
})


const port = 8000;
server.listen(port, '127.0.0.1', () => {
    console.log(`Listening to requests on port ${port}`);
})