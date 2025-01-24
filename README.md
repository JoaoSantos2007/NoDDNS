# NoDDNS

NoDDNS é um sistema simples para sincronizar o IP público dinâmico do seu roteador com seu servidor principal, eliminando a necessidade de serviços externos de DNS dinâmico. Este projeto consiste em um cliente (`sendIP.sh`) que envia o IP público para uma API em Node.js no servidor principal, que atualiza automaticamente o host `home` para apontar para o IP público atual.

## Funcionalidades

- Sincronização automática do IP dinâmico do roteador com o servidor principal.
- Cliente simples em shell script para envio do IP público.
- API em Node.js para receber e atualizar o host principal.

## Arquitetura do Sistema

1. **Cliente (`sendIP.sh`)**:
   - Envia uma requisição para a API hospedada no servidor principal.

2. **Servidor (API em Node.js)**:
   - Recebe o IP público enviado pelo cliente.
   - Atualiza o host `home` do servidor principal para apontar para o IP público fornecido pelo cabeçalho da requisição.

---

## Como Funciona?

1. O cliente (`sendIP.sh`) executa periodicamente, por exemplo, via `cron`, e envia o IP público para o servidor.
2. O servidor (API em Node.js) processa a requisição recebida e atualiza a configuração do host.

---

## Configuração e Instalação

### Cliente (`sendIP.sh`)

1. Certifique-se de ter o `curl` instalado:
   ```bash
   sudo apt install curl
   ```

2. Configure o script `sendIP.sh` com a URL da sua API:
   ```bash
   # sendIP.sh
   REMOTE_SERVER="http://seu-servidor-principal:porta/api/syncIP"
   ```

3. Adicione uma tarefa ao `cron` para executar o script periodicamente:
   ```bash
   crontab -e
   # Adicione a linha abaixo para executar a cada 10 minutos
   */10 * * * * /caminho/para/sendIP.sh
   ```

### Servidor (API em Node.js)

1. Clone o repositório:
   ```bash
   git clone https://github.com/JoaoSantos2007/NoDDNS.git
   cd NoDDNS/server
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```

---

## API

### Endpoint: Atualizar IP Público

**URL:**  
`POST /api/syncIP`

**Headers:**  
- `Authorization: Bearer <AUTH_TOKEN>`


**Resposta:**
- **200 OK:** IP atualizado com sucesso.
- **400 Bad Request:** Requisição inválida.
- **500 Internal Error:** Erro interno do servidor 

---

## Segurança

- A comunicação entre o cliente e o servidor pode ser protegida com HTTPS.
- Um token de autenticação é usado para garantir que apenas o cliente autorizado atualize o IP.

---

Fique à vontade para sugerir melhorias ou relatar problemas!
