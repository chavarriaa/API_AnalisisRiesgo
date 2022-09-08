const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const PoliticaSeguridadModel = require('../models/PoliticaSeguridad');
const ResponseHandler = require('../lib/handlers');

router.get('/politica-seguridad', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let politicaSeguridad = PoliticaSeguridadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(politicaSeguridad.queryGet);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/opciones/politica-seguridad', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let politicaSeguridad = PoliticaSeguridadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
            .query(politicaSeguridad.queryGetForSelects);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/politica-seguridad/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let politicaSeguridad = PoliticaSeguridadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
            .input('Id',sql.Int,politicaSeguridad.Id)
            .query(politicaSeguridad.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.post('/politica-seguridad', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let politicaSeguridad = PoliticaSeguridadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
            .input('Identificador',sql.VarChar(10),politicaSeguridad.Identificador)
            .input('Version',sql.VarChar(10),politicaSeguridad.Version)
            .input('FechaCreado',sql.Date,politicaSeguridad.FechaCreado)
            .input('FechaActualizado',sql.Date,politicaSeguridad.FechaActualizado)
            .input('CreadorPor',sql.VarChar(40),politicaSeguridad.CreadorPor)
            .input('AutorizadoPor',sql.VarChar(40),politicaSeguridad.AutorizadoPor)
            .input('Nombre',sql.VarChar(100),politicaSeguridad.Nombre)
            .input('Descripcion',sql.NVarChar(sql.MAX),politicaSeguridad.Descripcion)
            .query(politicaSeguridad.queryInsert);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.put('/politica-seguridad/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let politicaSeguridad = PoliticaSeguridadModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
            .input('Id',sql.Int,politicaSeguridad.Id)
            .input('Identificador',sql.VarChar(10),politicaSeguridad.Identificador)
            .input('Version',sql.VarChar(10),politicaSeguridad.Version)
            .input('FechaCreado',sql.Date,politicaSeguridad.FechaCreado)
            .input('FechaActualizado',sql.Date,politicaSeguridad.FechaActualizado)
            .input('CreadorPor',sql.VarChar(40),politicaSeguridad.CreadorPor)
            .input('AutorizadoPor',sql.VarChar(40),politicaSeguridad.AutorizadoPor)
            .input('Nombre',sql.VarChar(100),politicaSeguridad.Nombre)
            .input('Descripcion',sql.NVarChar(sql.MAX),politicaSeguridad.Descripcion)
            .query(politicaSeguridad.queryUpdate);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/politica-seguridad/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let politicaSeguridad = PoliticaSeguridadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
            .input('Id',sql.Int,politicaSeguridad.Id)
            .query(politicaSeguridad.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

module.exports = router;