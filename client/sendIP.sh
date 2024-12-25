#!/bin/bash

# Defina a URL do seu servidor remoto e a chave de segurança (caso necessário)
REMOTE_SERVER="http://webisk.com.br/noddns/syncIP"
API_KEY="123456"  # Se necessário para autenticação

# Envia o IP para o servidor remoto via POST
curl -X POST -d "api_key=$API_KEY" $REMOTE_SERVER

echo "IP enviado para o servidor remoto"