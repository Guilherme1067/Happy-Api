import express from 'express';

import './database/connections';

const app = express();
app.use(express.json());
// Rota = conjunto
// Recurso = usuario

// Métodos HTTP = GET, POST, PUT, DELETE
// Parâmetros

// Query Params: http://loclhost:3333/users?search=gui
// Route Params: http://loclhost:3333/users/1 (Identificar um recurso)
// Body: http://loclhost:3333/users/1 (Identificar um recurso)

app.get('/users', (request,response) =>{
    return response.json("hello world")
})

app.listen(3333)    

