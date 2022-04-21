import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = (req, res) => {
        livros.find((err, livros) => {
            res.status(200).json(livros);
        })
    }

    static buscarLivro = (req, res) => {
        const { id } = req.params;
        livros.findById(id, (err, livro) => {
            if (err) {
                res.status(500).json({message: err.message});
            } else {
                res.status(200).json(livro);
            }
        })
    }

    static cadastrarLivro = (req, res) => {
        const livro = new livros(req.body);
        livros.create(livro, (err, livro) => {
            if (err) {
                res.status(500).json({message: err.message});
            } else {
                res.status(201).json(livro);
            }
        })
    }

    static atualizarLivro = (req, res) => {
        const { id } = req.params;
        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (err) {
                res.status(500).json({message: err.message});
            } else {
                livros.findById(id, (_, livro) => {
                    res.status(200).json(livro);
                })
            }
        })
    }

    static excluirLivro = (req, res) => {
        const { id } = req.params;
        livros.findByIdAndRemove(id, (err) => {
            if (err) {
                res.status(500).json({message: err.message});
            } else {
                res.status(200).json({message: "Livro excluído com sucesso!"});
            }
        })
    }

}

export default LivroController