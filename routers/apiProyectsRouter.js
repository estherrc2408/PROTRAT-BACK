const express = require('express')

const router=express.Router();


router.get('/',getAllProyects);//Usado por nadie
router.get('/:id', getUserProyects)//Usado por el profile del usuario y por no users en vista usuario
router.post('/',createProyect);//Usado solo por el sign, para No users
router.delete('/:id',deleteProyect);//Usado solo por home del admin, vista de todos los usuarios
router.put('/:id',updateProyect);//Usado solo por el propio usuario, vista de profile

module.exports=router;