const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const PosibilidadModel = require('../models/Posibilidad');
const ResponseHandler = require('../lib/handlers');

router.get('/posibilidad', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let posibilidad = PosibilidadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(posibilidad.queryGet);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/opciones/posibilidad', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}

        let posibilidad = PosibilidadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(posibilidad.queryGetForSelects);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});




router.get('/posibilidad/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let posibilidad = PosibilidadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,posibilidad.Id)
        .query(posibilidad.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.post('/posibilidad', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let posibilidad = PosibilidadModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('Nivel',sql.VarChar(64),posibilidad.Nivel)
        .input('Puntaje',sql.Int,posibilidad.Puntaje)
        .input('Descripcion',sql.VarChar(256),posibilidad.Descripcion)
        .query(posibilidad.queryInsert);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.put('/posibilidad/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let posibilidad = PosibilidadModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('Id',sql.Int,posibilidad.Id)
        .input('Nivel',sql.VarChar(64),posibilidad.Nivel)
        .input('Puntaje',sql.Int,posibilidad.Puntaje)
        .input('Descripcion',sql.VarChar(256),posibilidad.Descripcion)
        .query(posibilidad.queryUpdate);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/posibilidad/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let posibilidad = PosibilidadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,posibilidad.Id)
        .query(posibilidad.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});




module.exports = router;