const express =require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3333);
app.set('json spaces',2);
app.use(express.json());

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/', require('./src/routes/Impacto'));
app.use('/', require('./src/routes/NivelRiesgo'));
app.use('/', require('./src/routes/Posibilidad'));
app.use('/', require('./src/routes/Riesgo'));
app.use('/', require('./src/routes/Activo'));
app.use('/', require('./src/routes/RiesgoActivo'));
app.use('/', require('./src/routes/PlanSeguridad'));
app.use('/', require('./src/routes/PlanAccion'));
app.use('/', require('./src/routes/Incidente'));
app.use('/', require('./src/routes/PlanRespuesta'));
app.use('/', require('./src/routes/PoliticaSeguridad'));
app.use('/', require('./src/routes/RiesgoPoliticas'));
app.listen(app.get('port'),(req,res)=>{
    console.log(`Escuchando puerto ${process.env.PORT}`);
});