const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const NivelRiesgoModel = require('../models/NivelRiesgo');
const ResponseHandler = require('../lib/handlers');

router.get('/nivelRiesgo', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}

        let nivelRiesgo = NivelRiesgoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(nivelRiesgo.queryGet);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/nivelRiesgo/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let nivelRiesgo = NivelRiesgoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,nivelRiesgo.Id)
        .query(nivelRiesgo.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.post('/nivelRiesgo', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let nivelRiesgo = NivelRiesgoModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('ValorMinimo',sql.Int,nivelRiesgo.ValorMinimo)
        .input('ValorMaximo',sql.Int,nivelRiesgo.ValorMaximo)
        .input('Descripcion',sql.VarChar(64),nivelRiesgo.Descripcion)
        .input('AccionTomar',sql.VarChar(128),nivelRiesgo.AccionTomar)
        .query(nivelRiesgo.queryInsert);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.put('/nivelRiesgo/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let nivelRiesgo = NivelRiesgoModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('ValorMinimo',sql.Int,nivelRiesgo.ValorMinimo)
        .input('ValorMaximo',sql.Int,nivelRiesgo.ValorMaximo)
        .input('Descripcion',sql.VarChar(64),nivelRiesgo.Descripcion)
        .input('AccionTomar',sql.VarChar(128),nivelRiesgo.AccionTomar)
        .query(nivelRiesgo.queryUpdate);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/nivelRiesgo/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let nivelRiesgo = NivelRiesgoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,nivelRiesgo.Id)
        .query(nivelRiesgo.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});




module.exports = router;