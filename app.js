const express = require('express');
const cors = require('cors');
const app=express();

//config .env
// require('dotenv').config();



const port=process.env.PORT||3000;

app.use(cors());

//Body-parser middleware JSON y urlencoded
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(__dirname+'/public'));

//Routers auth


//Routers CRUD
app.use('/api/users',require('./routers/apiUsersRouter'));
app.use('/api/projects',require('./routers/apiProjectsRouter'));
// app.use('/api/gallery',require('./routers/apiGalleryRouter'));
// app.use('/api/comments',require('./routers/apiCommentsRouter'));

app.use('/api/login',require('./routers/logRouter'));

app.listen(port,()=>{
    console.log(`servidor a la escucha del puerto ${port}`);
})