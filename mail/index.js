const nodemailer = require('nodemailer');
const restify = require('restify');
const restifyCorsMiddleware = require('restify-cors-middleware');

const { mailer } = require('./auth');

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

/**
 * Mailer API.
 * Receives a JSON containing name, email and message.
 * Formats it and sends it to my personal email using a specific account.
 */
server.post('/mail', (req, res, next) => {
    const { name, message, email } = req.body;

    if (!(name && message && email))
    {
        res.send(400);
        console.warn(`Bad request.`);
        return;
    }

    const mail = {
        from: mailer.user,
        to: 'tan-90@outlook.com',
        subject: `[tan90.io] New message from ${name}.`,
        html: `<p>${message}</p><br/><p>${email}</p>`
    };

    transport.sendMail(mail, (err, inf) => {
        if (err)
        {
            res.send(500);
            console.error('Error sending mail: ', err.message);
        }
        else
        {
            res.send(200);
            console.info(`Mail sent: ${name} as ${email}.`);
        }
    });
});

server.listen(3000, () => console.info('Listening...'));
