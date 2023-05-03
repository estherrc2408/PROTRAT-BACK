const express = require('express');
const app=express();

//config .env
// require('dotenv').config();



const port=process.env.PORT||3000;

//Body-parser middleware JSON y urlencoded
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(__dirname+'/public'));

//Routers auth
app.use('/login',require('./routers/logRouter'));

//Routers CRUD
app.use('/api/users',require('./routers/apiUsersRouter'));
app.use('/api/projects',require('./routers/apiProjectsRouter'));
// app.use('/api/gallery',require('./routers/apiGalleryRouter'));
// app.use('/api/comments',require('./routers/apiCommentsRouter'));

app.listen(port,()=>{
    console.log(`servidor a la escucha del puerto ${port}`);
})