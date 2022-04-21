import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = (req, res) => {
        livros.find((err, livros) => {
            res.status(200).json(livros);
        })
    }

    static cadastrarLivro = (req, res) => {
        const livro = new livros(req.body);
        livros.create(livro, (err, livro) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(201).json(livro);
            }
        })
    }

}

export default LivroController