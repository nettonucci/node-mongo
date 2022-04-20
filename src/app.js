import express from 'express';
import 'dotenv/config';
import db from './config/dbConnect.js';
import livros from './models/Livro.js';

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('[Mongo DB] Connected');
})

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
})

app.get('/livros', (req, res) => {
    livros.find((err, livros) => {
        res.status(200).json(livros);
    })
})

app.get('/livros/:id', (req, res) => {
    const { id } = req.params;
    const livro = buscaLivro(id);
    res.status(200).json(livros[livro]);
})

app.post('/livros', (req, res) => {
    const livro = req.body;
    livros.push(livro);
    res.status(201).json(livro);
})

app.put('/livros/:id', (req, res) => {
    const { id } = req.params;
    const livro = buscaLivro(id);
    livros[livro].nome = req.body.nome;
    livros[livro].autor = req.body.autor;
    res.status(200).json(livro);
})

app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;
    const livro = buscaLivro(id);
    livros.splice(livro, 1);
    res.status(200).send(`Livro ${id} deletado`);
})

const buscaLivro = (id) => {
    return livros.findIndex(l => l.id === Number(id));
}

export default app;