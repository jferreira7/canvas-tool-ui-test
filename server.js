const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 4204;

// Criar certificado self-signed para HTTPS
// Você pode gerar um certificado usando OpenSSL ou usar o módulo 'selfsigned'
// Para desenvolvimento, vamos usar uma abordagem simples com HTTP primeiro

const http = require('http');

const server = http.createServer((req, res) => {
    // Remove query string da URL para servir arquivos
    let filePath = req.url.split('?')[0];
    
    // Rota padrão
    if (filePath === '/') {
        filePath = '/index.html';
    }

    // Caminho completo do arquivo
    const fullPath = path.join(__dirname, filePath);
    
    // Extensão do arquivo
    const extname = String(path.extname(filePath)).toLowerCase();
    
    // Tipos MIME
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Ler e servir o arquivo
    fs.readFile(fullPath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Arquivo não encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Erro no servidor: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`\nPara testar com os parâmetros, acesse:`);
    console.log(`http://localhost:${PORT}/?givenName=FS - DEV - Jean&accessToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...`);
});
