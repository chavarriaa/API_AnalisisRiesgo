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

router.get('/plan-seguridad/:PlanSeguridad/politicas', async(req,res)=>{
    try {
        let data = {...req.body,...req.params}
        let PlanPoliticas = PlanAccionModel(data,req.query);
        let pool = await sql.connect(config);
        let response = await pool.request()
        .input('Id',sql.Int,PlanPoliticas.Id)
        .input('PlanSeguridad',sql.Int,PlanPoliticas.PlanSeguridad)
        .query(PlanPoliticas.queryGetByID);

        res.status(200).json(response.recordsets[0].map((item)=> item.PoliticaSeguridad));
    } catch (e) {
        console.error(e)
        res.status(400).json(ResponseHandler.error(e));
    }
});


module.exports = router;