const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const ImpactoModel = require('../models/impacto');
const ResponseHandler = require('../lib/handlers');

router.get('/impacto', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let impacto = ImpactoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(impacto.queryGet);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/opciones/impacto', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let impacto = ImpactoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(impacto.queryGetForSelects);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});



router.get('/impacto/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let impacto = ImpactoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,impacto.Id)
        .query(impacto.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.post('/impacto', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let impacto = ImpactoModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('Nivel',sql.VarChar(64),impacto.Nivel)
        .input('Puntaje',sql.Int,impacto.Puntaje)
        .input('Descripcion',sql.VarChar(256),impacto.Descripcion)
        .query(impacto.queryInsert);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.put('/impacto/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let impacto = ImpactoModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('Id',sql.Int,impacto.Id)
        .input('Nivel',sql.VarChar(64),impacto.Nivel)
        .input('Puntaje',sql.Int,impacto.Puntaje)
        .input('Descripcion',sql.VarChar(256),impacto.Descripcion)
        .query(impacto.queryUpdate);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/impacto/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let impacto = ImpactoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,impacto.Id)
        .query(impacto.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});




module.exports = router;