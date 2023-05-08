const express = require('express')

const {getUsers,getUsersBySearch,getOneUser,createUser,deleteUser,updateUser} = require ('../controllers/apiUsersController');

const router=express.Router();



router.get('/nick/',getUsersBySearch);
router.get('/nickname/:nickname',getOneUser);
router.get('/',getUsers);

//  getAllUsers Usado solo por home del admin, vista de todos los usuarios
//  getUserById Usado por la vista detalle de usuario
//  getUseByNickname Usado por el search en la búsqueda de proyectos o usuarios
router.post('/',createUser);//Usado solo por el sign, para No users
router.delete('/:id',deleteUser);//Usado solo por home del admin, vista de todos los usuarios
router.put('/:id',updateUser);//Usado solo por el propio usuario, vista de profile

module.exports=router;