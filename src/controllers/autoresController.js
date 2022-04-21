import autores from "../models/Autor.js";

class AutorController {

    static listarAutores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores);
        })
    }

    static buscarAutor = (req, res) => {
        const { id } = req.params;
        autores.findById(id, (err, autor) => {
            if (err) {
                res.status(500).json({message: err.message});
            } else {
                res.status(200).json(autor);
            }
        })
    }

    static cadastrarAutor = (req, res) => {
        const autor = new autores(req.body);
        autores.create(autor, (err, autor) => {
            if (err) {
                res.status(500).json({message: err.message});
            } else {
                res.status(201).json(autor);
            }
        })
    }

    static atualizarAutor = (req, res) => {
        const { id } = req.params;
        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (err) {
                res.status(500).json({message: err.message});
            } else {
                autores.findById(id, (_, autor) => {
                    res.status(200).json(autor);
                })
            }
        })
    }

    static excluirAutor = (req, res) => {
        const { id } = req.params;
        autores.findByIdAndRemove(id, (err) => {
            if (err) {
                res.status(500).json({message: err.message});
            } else {
                res.status(200).json({message: "Autor excluído com sucesso!"});
            }
        })
    }

}

export default AutorController