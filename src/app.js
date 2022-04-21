import express from 'express';
import 'dotenv/config';
import db from './config/dbConnect.js';
import livros from './models/Livro.js';
import routes from './routes/index.js';

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('[Mongo DB] Connected');
})

const app = express();

app.use(express.json());

routes(app);

app.get('/livros/:id', (req, res) => {
    const { id } = req.params;
    const livro = buscaLivro(id);
    res.status(200).json(livros[livro]);
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