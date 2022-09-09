const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const RiesgoModel = require('../models/riesgo');
const ResponseHandler = require('../lib/handlers')

router.get('/riesgo', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let riesgo = RiesgoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(riesgo.queryGet);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/riesgo/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let riesgo = RiesgoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,riesgo.Id)
        .query(riesgo.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.post('/riesgo', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}

        let riesgo = RiesgoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Nombre',sql.VarChar(256),riesgo.Nombre)
        .input('AfectaCosto',sql.Bit,riesgo.AfectaCosto)
        .input('ValorCosto',sql.Decimal,riesgo.ValorCosto)
        .input('AfectaTiempo',sql.Bit,riesgo.AfectaTiempo)
        .input('AfectaAlcance',sql.Bit,riesgo.AfectaAlcance)
        .input('AfectaCalidad',sql.Bit,riesgo.AfectaCalidad)
        .input('IdPosibilidad',sql.Int,riesgo.IdPosibilidad)
        .input('IdImpacto',sql.Int,riesgo.IdImpacto)
        .query(riesgo.queryInsert);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.put('/riesgo/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let riesgo = RiesgoModel(data,req.query);
        let pool = await sql.connect(config);
console.log()
        let response = await pool.request()
        .input('Id',sql.Int,riesgo.Id)
        .input('Nombre',sql.VarChar(256),riesgo.Nombre)
        .input('AfectaCosto',sql.Bit,riesgo.AfectaCosto)
        .input('ValorCosto',sql.Decimal,riesgo.ValorCosto)
        .input('AfectaTiempo',sql.Bit,riesgo.AfectaTiempo)
        .input('AfectaAlcance',sql.Bit,riesgo.AfectaAlcance)
        .input('AfectaCalidad',sql.Bit,riesgo.AfectaCalidad)
        .input('IdPosibilidad',sql.Int,riesgo.IdPosibilidad)
        .input('IdImpacto',sql.Int,riesgo.IdImpacto)
        .query(riesgo.queryUpdate);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/riesgo/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let riesgo = RiesgoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,riesgo.Id)
        .query(riesgo.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});




module.exports = router;