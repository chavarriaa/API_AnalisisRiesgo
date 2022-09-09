const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const RiesgoAccionModel = require('../models/RiesgoPoliticas');
const ResponseHandler = require('../lib/handlers')

router.post('/riesgo-seguridad/:Riesgo/politicas/asociar',async(req,res)=>{
        let data = {
            politicas: [...req.body],
            Riesgo:req.params.Riesgo
        }
        let RiesgoPoliticas = RiesgoAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let sendRiesgoPoliticas= async (PoliticaSeguridad,Riesgo)=>{
            try {
                let result = await pool.request()
                    .input('Riesgo', sql.Int, Riesgo)
                    .input('PoliticaSeguridad', sql.Int, PoliticaSeguridad)
                    .query(RiesgoPoliticas.queryInsert);
            } catch (error) {
                console.log(`error en el Query ${PoliticaSeguridad,Riesgo}`);
                throw error;   
            }
        }
        let deleteRiesgoPoliticas= await pool.query(`DELETE FROM RiesgoPoliticas WHERE Riesgo = ${data.Riesgo}`)
        Promise.all(
            data.politicas.map((item) => {
                sendRiesgoPoliticas(item,data.Riesgo)
                .catch(err=>console.log(`Error ${err}`))
            })
        ).then((result) => {
                console.log('completed');
                res.status(200).json(data);
        }).catch((err) => {
            res.status(400).json(err);
        });     
});

router.get('/riesgo-seguridad/:Riesgo/politicas/', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let RiesgoPoliticas = RiesgoAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
            .input('Id',sql.Int,RiesgoPoliticas.Id)
            .input('Riesgo',sql.Int,RiesgoPoliticas.Riesgo)
            .query(RiesgoPoliticas.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/riesgo-seguridad/:Riesgo/riesgo-accion', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let RiesgoPoliticas = RiesgoAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
            .input('Riesgo',sql.Int,RiesgoPoliticas.Riesgo)
            .input('PoliticaSeguridad',sql.Date,RiesgoPoliticas.PoliticaSeguridad)
            .query(RiesgoPoliticas.queryInsert);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.put('/riesgo-seguridad/:Riesgo/riesgo-accion/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let RiesgoPoliticas = RiesgoAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
            .input('Id',sql.Int,RiesgoPoliticas.Id)
            .input('Riesgo',sql.Int,RiesgoPoliticas.Riesgo)
            .input('PoliticaSeguridad',sql.Date,RiesgoPoliticas.PoliticaSeguridad)
            .query(RiesgoPoliticas.queryUpdate);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/riesgo-seguridad/:Riesgo/riesgo-accion/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let RiesgoPoliticas = RiesgoAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
            .input('Id',sql.Int,RiesgoPoliticas.Id)
            .query(RiesgoPoliticas.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

module.exports = router;