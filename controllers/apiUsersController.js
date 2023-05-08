
const { getAllUsers, getUsersByNickname, getUserByNickname, createUserM, updateUserM, deleteUserM } = require('../models/userModels/user');
const { storage, upload } = require('../config/multer')
const multer = require('multer');


const getUsersBySearch = async (req, res) => {
    let data;
    console.log('en search ', req.query);
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
    let { nickname } = req.params;
    console.log(!nickname)
    try {
        if (nickname) {
            console.log('hallando usuario por nickname');
            data = await getUserByNickname(nickname);
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

const getUsers = async (_req, res) => {

    let data;

    try {
        data = await getAllUsers()
        console.log('hallando todos los usuarios');
        console.log(data)
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

    try {
        const { body } = req;
        console.log(req.body)

        const petition = await createUserM(body);
        console.log(petition)
        if (!petition) {
            res.status(200).json({
                ok: true,
                msg: 'Usuario creado'
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: petition
            });
        }
        //   });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario'
        });
    }
};


const updateUser = async (req, res) => {
    let { id } = req.params;
    const { body } = req;

    try {
        await upload.single('image')(req, res, async function (err) {
            
            if (err instanceof multer.MulterError) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al cargar la imagen 1'
                });
            } else if (err) {
                console.log(err)
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al cargar la imagen 2'
                });
            }

            const imageName = req.file ? req.file.path : "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
            // console.log(imageName);
            const petition = await updateUserM(body, id, imageName);
           
            if (typeof petition == 'string') {
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
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al editar el usuario'
        })
    }










    // let { id } = req.params;
    // const { body } = req;

    // try {
    //     const petition = await updateUserM(body, id);
    //     if (typeof petition=='string') {
    //         console.log(petition)
    //         res.status(404).json({
    //             ok: true,
    //             msg: petition
    //         })
    //     } else {
    //         res.status(200).json({
    //             ok: true,
    //             msg: 'Usuario editado'
    //         })
    //     }

    // } catch (error) {
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Error al editar el usuario'
    //     })
    // }




};

const deleteUser = async (req, res) => {

    let { id } = req.params;
    try {
        const petition = await deleteUserM(id);
        if (typeof petition == 'string') {
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