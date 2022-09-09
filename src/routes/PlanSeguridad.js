const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const PlanSeguridadModel = require('../models/PlanSeguridad');
const ResponseHandler = require('../lib/handlers');

router.get('/plan-seguridad', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let planSeguridad = PlanSeguridadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(planSeguridad.queryGet);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/opciones/plan-seguridad', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let planSeguridad = PlanSeguridadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(planSeguridad.queryGetForSelects);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});



router.get('/plan-seguridad/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let planSeguridad = PlanSeguridadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,planSeguridad.Id)
        .query(planSeguridad.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.post('/plan-seguridad', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let planSeguridad = PlanSeguridadModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('Identificador',sql.VarChar(10),planSeguridad.Identificador)
        .input('FechaInicio',sql.Date,planSeguridad.FechaInicio)
        .input('FechaFin',sql.Date,planSeguridad.FechaFin)
        .input('CreadoPor',sql.VarChar(20),planSeguridad.CreadoPor)
        .input('AutorizadoPor',sql.VarChar(20),planSeguridad.AutorizadoPor)
        .input('Recursos',sql.VarChar,planSeguridad.Recursos)
        .input('Descripcion',sql.NVarChar(sql.MAX),planSeguridad.Descripcion)
        .query(planSeguridad.queryInsert);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.put('/plan-seguridad/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let planSeguridad = PlanSeguridadModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('Id',sql.Int,planSeguridad.Id)
        .input('Identificador',sql.VarChar(10),planSeguridad.Identificador)
        .input('FechaInicio',sql.Date,planSeguridad.FechaInicio)
        .input('FechaFin',sql.Date,planSeguridad.FechaFin)
        .input('CreadoPor',sql.VarChar(20),planSeguridad.CreadoPor)
        .input('AutorizadoPor',sql.VarChar(20),planSeguridad.AutorizadoPor)
        .input('Recursos',sql.VarChar,planSeguridad.Recursos)
        .input('Descripcion',sql.NVarChar(sql.MAX),planSeguridad.Descripcion)
        .query(planSeguridad.queryUpdate);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/plan-seguridad/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let planSeguridad = PlanSeguridadModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,planSeguridad.Id)
        .query(planSeguridad.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});




module.exports = router;