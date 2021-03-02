const express = require('express');
const bodyParser = require('body-parser');
const usuario = require('./rotas/usuario');
const notas  = require('./rotas/notas');
const checklist = require('./rotas/checklist');
const tag = require('./rotas/tag');
const app = express();
const port = 3000;

//app.use(bodyParser.json);

app.use('/usuario', usuario);
app.use('/notas', notas);
app.use('/checklist', checklist);
app.use('/tag', tag);

app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${3000}`);
});