const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const PlanAccionModel = require('../models/PlanPoliticas');
const ResponseHandler = require('../lib/handlers');

router.post('/plan-seguridad/:PlanSeguridad/politicas/asociar',async(req,res)=>{

        let data =  {
            politicas: [...req.body],
            PlanSeguridad:req.params.PlanSeguridad
        }
        let PlanPoliticas = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);

        let sendPlanPoliticas= async (PoliticaSeguridad,PlanSeguridad)=>{
            try {
                let result = await pool.request()
                .input('PlanSeguridad', sql.Int, PlanSeguridad)
                .input('PoliticaSeguridad', sql.Int, PoliticaSeguridad)
                .query(PlanPoliticas.queryInsert);
            } catch (error) {
                console.log(`error en el Query ${PoliticaSeguridad,PlanSeguridad}`);
                throw error;   
            }
        }
         let deletePlanPoliticas= await pool.query(`DELETE FROM PlanPoliticas WHERE PlanSeguridad = ${data.PlanSeguridad}`)
        Promise.all(
            data.politicas.map((item) => {
                sendPlanPoliticas(item,data.PlanSeguridad)
                .catch(err=>console.log(`Error ${err}`))
            })
        ).then((result) => {
                console.log('completed');
                res.status(200).json(data);
        }).catch((err) => {
            res.status(400).json(err);
          });     
});

router.get('/plan-seguridad/:planSeguridad/politicas/', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let PlanPoliticas = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,PlanPoliticas.Id)
        .input('planSeguridad',sql.Int,PlanPoliticas.planSeguridad)
        .query(PlanPoliticas.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.get('/plan-seguridad/:planSeguridad/plan-accion', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let PlanPoliticas = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('planSeguridad',sql.Int,PlanPoliticas.planSeguridad)
        .input('FechaInicio',sql.Date,PlanPoliticas.FechaInicio)
        .input('FechaFin',sql.Date,PlanPoliticas.FechaFin)
        .input('Responsable',sql.VarChar(40),PlanPoliticas.Responsable)
        .input('Auditor',sql.VarChar(40),PlanPoliticas.Auditor)
        .input('Descripcion',sql.NVarChar(300),PlanPoliticas.Descripcion)
        .query(PlanPoliticas.queryInsert);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.put('/plan-seguridad/:planSeguridad/plan-accion/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let PlanPoliticas = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('Id',sql.Int,PlanPoliticas.Id)
        .input('planSeguridad',sql.Int,PlanPoliticas.planSeguridad)
        .input('FechaInicio',sql.Date,PlanPoliticas.FechaInicio)
        .input('FechaFin',sql.Date,PlanPoliticas.FechaFin)
        .input('Responsable',sql.VarChar(40),PlanPoliticas.Responsable)
        .input('Auditor',sql.VarChar(40),PlanPoliticas.Auditor)
        .input('Descripcion',sql.NVarChar(300),PlanPoliticas.Descripcion)
        .query(PlanPoliticas.queryUpdate);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/plan-seguridad/:planSeguridad/plan-accion/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let PlanPoliticas = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,PlanPoliticas.Id)
        .query(PlanPoliticas.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});




module.exports = router;