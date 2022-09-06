const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const PlanAccionModel = require('../models/planAccion');
const ResponseHandler = require('../lib/handlers');

router.get('/plan-seguridad/:planSeguridad/plan-accion', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}

        let planAccion = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('planSeguridad',sql.Int,planAccion.planSeguridad)
        .query(planAccion.queryGet);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/plan-seguridad/:planSeguridad/plan-accion/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let planAccion = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,planAccion.Id)
        .input('planSeguridad',sql.Int,planAccion.planSeguridad)
        .query(planAccion.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.post('/plan-seguridad/:planSeguridad/plan-accion', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let planAccion = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('planSeguridad',sql.Int,planAccion.planSeguridad)
        .input('FechaInicio',sql.Date,planAccion.FechaInicio)
        .input('FechaFin',sql.Date,planAccion.FechaFin)
        .input('Responsable',sql.VarChar(40),planAccion.Responsable)
        .input('Auditor',sql.VarChar(40),planAccion.Auditor)
        .input('Descripcion',sql.NVarChar(300),planAccion.Descripcion)
        .query(planAccion.queryInsert);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.put('/plan-seguridad/:planSeguridad/plan-accion/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let planAccion = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('Id',sql.Int,planAccion.Id)
        .input('planSeguridad',sql.Int,planAccion.planSeguridad)
        .input('FechaInicio',sql.Date,planAccion.FechaInicio)
        .input('FechaFin',sql.Date,planAccion.FechaFin)
        .input('Responsable',sql.VarChar(40),planAccion.Responsable)
        .input('Auditor',sql.VarChar(40),planAccion.Auditor)
        .input('Descripcion',sql.NVarChar(300),planAccion.Descripcion)
        .query(planAccion.queryUpdate);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/plan-seguridad/:planSeguridad/plan-accion/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let planAccion = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,planAccion.Id)
        .query(planAccion.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});




module.exports = router;