import express from "express";
import livros from './livrosRoute.js'  ;

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send('Curso de Node');
    });

    app.use(express.json(), livros);
}

export default routes;