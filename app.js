const express = require('express');
const bodyParser = require('body-parser');
const usuario = require('./rotas/usuario');
const notas  = require('./rotas/notas');
const checklist = require('./rotas/checklist');
const login = require('./rotas/login');
const auth = require('./middlewares/auth');
const tag = require('./rotas/tag');
const app = express();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
//const { login } = require('./controller/controleusuario');
const port = 3000;
const portaHttps = 443;

app.use(cors({
    origin: [
        'https://localhost:8080'
    ]
}));
app.use(bodyParser.json());

app.use('/login', login);
//app.use(auth);
app.use('/usuario', usuario);
app.use('/notas', notas);
app.use('/checklist', checklist);
app.use('/tag', tag);

const key = fs.readFileSync('certs/localhost-key.pem');
const cert = fs.readFileSync('certs/localhost.pem');

const credentials = { key, cert};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(portaHttps, () => {
    console.log(`Api Rodando Seguramente na porta ${ portaHttps}`);

});
app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${3000}`);
});

