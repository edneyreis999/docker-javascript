FROM node:20-slim

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json para o diretório de trabalho
COPY . .

RUN apt update && \
    apt install -y wget netcat-traditional && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for
    
RUN npm install

# Exponha a porta da aplicação (caso necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]