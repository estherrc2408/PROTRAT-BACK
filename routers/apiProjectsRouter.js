const express = require('express')

const router=express.Router();

const {getAllProjects,getUserProjects,getOneProject,createProject,deleteProject,updateProject}=require('../controllers/apiProjectController')
router.get('/',getAllProjects);//Usado por nadie
router.get('/uid/:id', getUserProjects);//Usado por el profile del usuario y por no users en vista usuario
router.get('/id/:id', getOneProject);//Usado al ampliar la vista de proyecto;
router.post('/:id',createProject);//Usado solo por usuarios, el id que coge es el del usuario
router.delete('/:pid',deleteProject);//Usado solo por home del admin, vista de todos los usuarios
router.put('/:pid',updateProject);//Usado solo por el propio usuario, vista de profile

module.exports=router;