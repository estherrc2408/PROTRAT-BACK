const express = require('express')

const {getAllUsers,createUser,deleteUser,updateUser} = require ('../controllers/apiUsersController');

const router=express.Router();


router.get('/',getAllUsers);//Usado solo por home del admin, vista de todos los usuarios
router.post('/',createUser);//Usado solo por el sign, para No users
router.delete('/:id',deleteUser);//Usado solo por home del admin, vista de todos los usuarios
router.put('/:id',updateUser);//Usado solo por el propio usuario, vista de profile

module.exports=router;