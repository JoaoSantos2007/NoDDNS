// Node.js needs permission to write to the /etc/hosts file
// Nginx must have the resolver 127.0.0.53 valid=10s; # To listen /etc/hosts file

import express from 'express';
import bodyParser from 'body-parser';
import { readFileSync, writeFileSync} from 'fs';

const app = express();
const hostsFile = '/etc/hosts';
const port = 8196;
const apiKey = '123456';

app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint para receber a requisição e atualizar o /etc/hosts
app.post('/syncIP', (req, res) => {
  try {
    if(req.headers['api_key'] !== apiKey) return res.status(401).send('Chave de API inválida');
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (!ip) return res.status(400).send('IP não fornecido');

    const data = readFileSync(hostsFile, 'utf8') // Leia o conteúdo atual do /etc/hosts

    const regex = /^(\S+)\s+home$/m;
    const match = data.match(regex);
    if(!match) return res.status(400).send('Nome "home" não encontrado no /etc/hosts');

    const updatedData = data.replace(regex, `${ip} home`); // Substitua o IP antigo pelo novo
    writeFileSync(hostsFile, updatedData, 'utf8'); // Escrever no arquivo /etc/hosts
    return res.status(201).send(`IP atualizado para: ${ip}`);
  } catch (err) {
    return res.status(500).send('Erro ao atualizar IP');
  }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`NoDDNS running on port ${port}`);
});