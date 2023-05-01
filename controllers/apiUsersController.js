const { query } = require('express');
const { getAllUsers, getUsersByNickname, getUserById, createUserM, updateUserM, deleteUserM } = require('../models/userModels/user');



const getUsersBySearch = async (req, res) => {
    let data;
    console.log('en search ',req.query);
    let { nickname } = req.query;

    try {
        if (nickname) {
        // if (typeof nickname != 'undefined') {
            data = await getUsersByNickname(nickname);
            console.log('hallando usuario por nickname');
        }

        res.status(200).json({
            ok: true,
            data
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al obtener información de los usuarios'
        })
    }

}

const getOneUser = async (req, res) => {
    let data;
    console.log(req.query);
    let { id } = req.query;
    console.log(!id)
    try {
        if (id) {
            console.log('hallando usuarios por id');
            data = await getUserById(id);
        }

        res.status(200).json({
            ok: true,
            data
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al obtener información del usuario'
        })
    }

}

const getUsers = async (req, res) => {

    let data;
    console.log(req.query);
    console.log(req.query.lenght)

    try {
        if(req.query.lenght==undefined){
        data = await getAllUsers()
        console.log('hallando todos los usuarios');
        console.log(data)        
        }
        res.status(200).json({
            ok: true,
            data
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al obtener información los usuarios'
        })
    }

};
/*
{
"email":"nuevo@pepe.com",
"password":"nuevopass",
"nickname":"nuevo",
"firstName":"nuevo1",
"lastName":"nuevo2",
"birthDate":"2002-03-01",
"rol":"standar"
}
*/
const createUser = async (req, res) => {

    let { body } = req;
    console.log('el body',body)
    try {
        petition = await createUserM(body);

        if (petition.detail != undefined) {
            res.status(404).json({
                ok: true,
                msg: petition.detail
            })
        } else {
            res.status(200).json({
                ok: true,
                msg: 'Usuario creado'
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario'
        })
    }

};

const updateUser = async (req, res) => {

    let { id } = req.params;
    const { body } = req;
    try {
        const petition = await updateUserM(body, id);
        if (typeof petition=='string') {
            console.log(petition)
            res.status(404).json({
                ok: true,
                msg: petition
            })
        } else {
            res.status(200).json({
                ok: true,
                msg: 'Usuario editado'
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al editar el usuario'
        })
    }

};

const deleteUser = async (req, res) => {

    let { id } = req.params;
    try {
        const petition = await deleteUserM(id);
        if (typeof petition=='string') {
            res.status(404).json({
                ok: false,
                msg: petition
            })
        } else {
            res.status(200).json({
                ok: true,
                msg: 'Usuario borrado'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar el usuario'
        })
    }

};

module.exports = {
    getUsers,
    getUsersBySearch,
    getOneUser,
    createUser,
    deleteUser,
    updateUser
};