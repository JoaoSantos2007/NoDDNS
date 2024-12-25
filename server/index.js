import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const hostsFile = '/etc/hosts';
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint para receber a requisição e atualizar o /etc/hosts
app.post('/syncIP', (req, res) => {
    // Obtém o IP da requisição
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Verifique se o IP foi recebido
    if (!ip) {
        return res.status(400).send('IP não fornecido');
    }

    // Leia o conteúdo atual do /etc/hosts
    fs.readFile(hostsFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler /etc/hosts');
        }

        // Substituir o IP antigo pelo novo
        const updatedData = data.replace(/45\.344\.334\.244/g, ip); // Substitua o IP antigo pelo novo

        // Escrever no arquivo /etc/hosts
        fs.writeFile(hostsFile, updatedData, 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar /etc/hosts');
            }

            res.send(`IP atualizado para: ${ip}`);
        });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor API rodando na porta ${port}`);
});