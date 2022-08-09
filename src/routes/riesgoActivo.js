const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const RiesgoActivoModel = require('../models/riesgoActivo');
const ResponseHandler = require('../lib/handlers');

router.get('/riesgo/:IdRiesgo/activo', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let riesgoActivo = RiesgoActivoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('IdRiesgo',sql.Int,riesgoActivo.IdRiesgo)
        .query(riesgoActivo.queryGet);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/riesgo/:IdRiesgo/activo/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let riesgoActivo = RiesgoActivoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('IdRiesgo',sql.Int,riesgoActivo.IdRiesgo)
        .input('Id',sql.Int,riesgoActivo.Id)
        .query(riesgoActivo.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.post('/riesgo/:IdRiesgo/activo', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let riesgoActivo = RiesgoActivoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('IdRiesgo',sql.Int,riesgoActivo.IdRiesgo)
        .input('IdActivo',sql.Int,riesgoActivo.IdActivo)
        .query(riesgoActivo.queryInsert);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.put('/riesgo/:IdRiesgo/activo/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let riesgoActivo = RiesgoActivoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,riesgoActivo.Id)
        .input('IdRiesgo',sql.Int,riesgoActivo.IdRiesgo)
        .input('IdActivo',sql.Int,riesgoActivo.IdActivo)
        .query(riesgoActivo.queryUpdate);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/riesgo/:IdRiesgo/activo/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let riesgoActivo = RiesgoActivoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('IdRiesgo',sql.Int,riesgoActivo.IdRiesgo)
        .input('Id',sql.Int,riesgoActivo.id)
        .query(riesgoActivo.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});




module.exports = router;