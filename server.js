/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  JavaScript AES client/server interoperability             (c) Chris Veness 2016 / MIT Licence */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

'use strict';

const fs          = require('fs');           // nodejs.org/api/fs.html
const connect     = require('connect');      // simple middleware framework
const serveStatic = require('serve-static'); // serve static files
const bodyParser  = require('body-parser');  // http request body parsing
const handlebars  = require('handlebars');   // handlebars templating

const AesCtr      = require('./public/js/aes-ctr.js');

const app = connect();

app.use(serveStatic('public')); // for .js files

app.use(bodyParser.urlencoded({ 'extended': false })); // parse request bodies into req.body

app.use(function processRequest(req, res, next) {
    let context = null;
    switch (req.method) {
        case 'GET':
            context = { };
            break;
        case 'POST':
            var ciphertext = AesCtr.encrypt(req.body.plaintext, req.body.password, 256);
            var plaintext = AesCtr.decrypt(req.body.ciphertext, req.body.password, 256);
            context = { 'ciphertext': ciphertext, 'plaintext':  plaintext };
            break;
    }
    const template = fs.readFileSync('index.html', 'utf-8');
    const templateFn = handlebars.compile(template);
    const html = templateFn(context);
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
});

app.listen(process.env.PORT||8080);
console.log('Listening on port '+(process.env.PORT||8080));