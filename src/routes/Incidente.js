const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const PlanAccionModel = require('../models/Incidente');
const ResponseHandler = require('../lib/handlers');

router.get('/plan-seguridad/:planSeguridad/incidente', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}

        let Incidente = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('planSeguridad',sql.Int,Incidente.planSeguridad)
        .query(Incidente.queryGet);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/plan-seguridad/:planSeguridad/incidente/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let Incidente = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,Incidente.Id)
        .input('planSeguridad',sql.Int,Incidente.planSeguridad)
        .query(Incidente.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.post('/plan-seguridad/:planSeguridad/incidente', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let Incidente = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('planSeguridad',sql.Int,Incidente.planSeguridad)
        .input('FechaInicio',sql.Date,Incidente.FechaInicio)
        .input('FechaFin',sql.Date,Incidente.FechaFin)
        .input('ProcesoAfectado',sql.VarChar(40),Incidente.ProcesoAfectado)
        .input('Nombre',sql.VarChar(100),Incidente.Nombre)
        .input('Descripcion',sql.NVarChar(300),Incidente.Descripcion)
        .query(Incidente.queryInsert);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.put('/plan-seguridad/:planSeguridad/incidente/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let Incidente = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('Id',sql.Int,Incidente.Id)
        .input('planSeguridad',sql.Int,Incidente.planSeguridad)
        .input('FechaInicio',sql.Date,Incidente.FechaInicio)
        .input('FechaFin',sql.Date,Incidente.FechaFin)
        .input('ProcesoAfectado',sql.VarChar(40),Incidente.ProcesoAfectado)
        .input('Nombre',sql.VarChar(100),Incidente.Nombre)
        .input('Descripcion',sql.NVarChar(300),Incidente.Descripcion)
        .query(Incidente.queryUpdate);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/plan-seguridad/:planSeguridad/incidente/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let Incidente = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,Incidente.Id)
        .input('planSeguridad',sql.Int,Incidente.planSeguridad)
        .query(Incidente.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});




module.exports = router;