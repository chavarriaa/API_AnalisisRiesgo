const express =require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.port || 3333);
app.set('json spaces',2);
app.use(express.json());

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/', require('./src/routes/impacto'));

app.listen(app.get('port'),(req,res)=>{
    console.log(`Escuchando puerto ${process.env.PORT}`);
});