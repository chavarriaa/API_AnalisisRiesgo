const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const PlanRespuestaModel = require('../models/PlanRespuesta');
const ResponseHandler = require('../lib/handlers');

router.get('/plan-seguridad/:planSeguridad/incidente/:Incidente/plan-respuesta', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let PlanRespuesta = PlanRespuestaModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('planSeguridad',sql.Int,PlanRespuesta.planSeguridad)
        .input('incidente',sql.Int,PlanRespuesta.Incidente)
        .query(PlanRespuesta.queryGet);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/plan-seguridad/:planSeguridad/incidente/:Incidente/plan-respuesta/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let PlanRespuesta = PlanRespuestaModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,PlanRespuesta.Id)
        .input('planSeguridad',sql.Int,PlanRespuesta.planSeguridad)
        .input('incidente',sql.Int,PlanRespuesta.Incidente)
        .query(PlanRespuesta.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.post('/plan-seguridad/:planSeguridad/incidente/:Incidente/plan-respuesta', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let PlanRespuesta = PlanRespuestaModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('planSeguridad',sql.Int,PlanRespuesta.planSeguridad)
        .input('incidente',sql.Int,PlanRespuesta.Incidente)

        .input('Fecha',sql.Date,PlanRespuesta.Fecha)

        .input('Descripcion',sql.VarChar,PlanRespuesta.Descripcion)
        .input('Responsable',sql.VarChar,PlanRespuesta.Responsable)
        .query(PlanRespuesta.queryInsert);
        res.status(200).json({...data});
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.put('/plan-seguridad/:planSeguridad/incidente/:Incidente/plan-respuesta/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let PlanRespuesta = PlanRespuestaModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('Id',sql.Int,PlanRespuesta.Id)
        .input('planSeguridad',sql.Int,PlanRespuesta.planSeguridad)
        .input('incidente',sql.Int,PlanRespuesta.Incidente)

        .input('Fecha',sql.Date,PlanRespuesta.Fecha)
        .input('Descripcion',sql.Varchar,PlanRespuesta.Descripcion)
        .input('Responsable',sql.Varchar,PlanRespuesta.Responsable)
        .query(PlanRespuesta.queryUpdate);
        res.status(200).json({...data});
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/plan-seguridad/:planSeguridad/incidente/:Incidente/plan-respuesta/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let PlanRespuesta = PlanRespuestaModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,PlanRespuesta.Id)
        .input('planSeguridad',sql.Int,PlanRespuesta.planSeguridad)
        .input('incidente',sql.Int,PlanRespuesta.Incidente)
        .query(PlanRespuesta.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});




module.exports = router;