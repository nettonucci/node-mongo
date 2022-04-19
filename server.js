const http = require('http');
const port = process.env.PORT || 3000;

const rotas = {
    '/': 'Curso de Node',
    '/livros': 'Lista de livros',
    '/autores': 'Lista de autores',
    '/sobre': 'Sobre o curso',
}
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(rotas[req.url]);
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})