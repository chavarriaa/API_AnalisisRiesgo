const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../lib/config');
const ActivoModel = require('../models/activo');
const ResponseHandler = require('../lib/handlers');

router.get('/activo', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}

        let activo = ActivoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .query(activo.queryGet);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});

router.get('/activo/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let activo = ActivoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,activo.Id)
        .query(activo.queryGetByID);
        res.status(200).json(response.recordsets[0]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.post('/activo', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let activo = ActivoModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('Nombre',sql.VarChar(256),activo.Nombre)
        .query(activo.queryInsert);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


router.put('/activo/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let activo = ActivoModel(data,req.query);
        let pool = await sql.connect(config);

        let response = await pool.request()
        .input('Id',sql.Int,activo.Id)
        .input('Nombre',sql.VarChar(256),activo.Nombre)
        .query(activo.queryUpdate);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});

router.delete('/activo/:Id', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let activo = ActivoModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,activo.Id)
        .query(activo.queryDelete);
        res.status(200).json([{...data}]);
    } catch (e) {
        console.error(e)
       res.status(400).json(ResponseHandler.error(e));
    }
});




module.exports = router;