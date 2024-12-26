#!/bin/bash

# Defina a URL do seu servidor remoto e a chave de segurança (caso necessário)
REMOTE_SERVER="https://webisk.com.br/noddns/syncIP"
API_KEY="123456"  # Se necessário para autenticação

# Envia o IP para o servidor remoto via POST
curl -X POST -H "Authorization: Bearer $API_KEY" $REMOTE_SERVER

echo ""
echo "IP enviado para o servidor remoto"