const nodemailer = require('nodemailer');
const restify = require('restify');
const restifyCorsMiddleware = require('restify-cors-middleware');

const {mailer} = require('./auth');

/*
 * Setup a transport.
 * Use google OAuth2 for secure connection. 
 */
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: mailer.user,
        clientId: mailer.clientId,
        clientSecret: mailer.clientSecret,
        refreshToken: mailer.refreshToken,
        accessToken: mailer.accessToken
    }
});

/*
 * Create restify server.
 * Also setup utilities for JSON.
 */
const server = restify.createServer();
server.use(restify.plugins.jsonBodyParser({mapParams: true}));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({mapParams: true}));
server.use(restify.plugins.fullResponse());

/*
 * CORS support.
 */
const cors = restifyCorsMiddleware({
    origins: ['http://localhost:8080'],
    allowHeaders: ['*'],
    exposeHeaders: []
});
server.pre(cors.preflight);
server.use(cors.actual);

/*
 * Mailer API.
 * Receives a JSON containing name, email and message.
 * Formats it and sends it to my personal email using a specific account (tan90mailer@gmail.com).
 */
server.post('/mail', (req, res, next) => {
    const mail = {
        from: mailer.user,
        to: 'tan-90@outlook.com',
        subject: `[tan90.io] New message from ${req.body.name}.`,
        html: `<p>${req.body.message}</p>\n<p>${req.body.email}</p>`
    };

    transport.sendMail(mail, (err, inf) => {
        if (err)
        {
            res.send(500);
            console.log(err);
        }
        else
        {
            res.send(200);
            console.log(`Mail sent: ${req.body.name} as ${req.body.email}.`);
        }
    });
});

server.listen(3000, () => console.log('Listening...'));
