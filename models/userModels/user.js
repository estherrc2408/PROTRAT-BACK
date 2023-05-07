const {getAllUsersQ, getUsersByNicknameQ, getUserByNicknameQ, createUserQ, updateUserQ, deleteUserQ} = require('./userQueries');

const {Pool} = require('pg');

//bcrypt
const bcryptjs = require ('bcryptjs');

//cambiar al pasar a Elephant
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'protratUsers',
    password: 'admin'
});

//OBTENER TODOS LOS USUARIOS
const getAllUsers = async () =>{
    let client, response;
    try{
        client=await pool.connect()
        console.log('hallando')
        const data = await client.query(getAllUsersQ)
        response=data.rows
    }catch(error){
        throw error
    }finally{
        client.release()
    }
    return response
}

//OBTENER DATOS DE USUARIOS POR NICKNAME
const getUsersByNickname = async(search) =>{
    let client, response;
    try{
        client = await pool.connect();
        const data = await client.query(getUsersByNicknameQ,[search]);
        response = data.rows;   
    }catch(error){
        throw error;
    }finally{
        client.release()
    }
    
    return response
}

//OBTENER USUARIO POR SU ID
const getUserByNickname = async (nickname) =>{
    let client, response;
    try{
        console.log(nickname);
        client = await pool.connect();
        const data = await client.query(getUserByNicknameQ,[nickname]);
        response = data.rows;
        console.log(response)
    }catch(error){
        throw error;
    }finally{
        client.release()
    }
    return response
}

//CREAR UN NUEVO USUARIO
const createUserM = async ({email,password,nickname,firstName,lastName,birthDate}) =>{
    let client;

    try{
        password = await bcryptjs.hash(password,6);

        const values = [
            email,
            password,
            nickname,
            firstName,
            lastName,
            birthDate,
          ];

        client = await pool.connect();
        await client.query(createUserQ,values);
        
    }catch(error){
        console.log(error.column!=undefined)
        if(error.column!=undefined){
            let customError = `El campo ${error.column} debe estar completo`;
            return customError;
        }else{
            let customError = error.detail;
            console.log(customError);
            return customError;   
        }
    }finally{
        client.release()
    }
}

//ACTUALIZAR UN USUARIO POR SU ID
const updateUserM = async ({email,nickname,firstName,lastName,birthDate,city,image,igNickname,twtNickname,lnkUrl},id)=>{
    let client;
    try{
        console.log(email,nickname,firstName,lastName,birthDate,city,image,igNickname,twtNickname,lnkUrl,id)
        client = await pool.connect();
        await client.query(updateUserQ,[email,nickname,firstName,lastName,birthDate,city,image,igNickname,twtNickname,lnkUrl,id]);
    }catch(error){
        console.log(error)
        if(error.column!=undefined){
            let customError = `El campo ${error.column} debe estar completo`;
            return customError;
        }else{
            let customError = error.detail;
            console.log(customError);
            return customError;   
        }
        
    }finally{
        client.release()
    }
}

//BORRAR UN USUARIO POR SU ID
const deleteUserM = async (id) =>{
    let client, data;
    try{
        client = await pool.connect();
        data =await client.query(deleteUserQ,[id]);
        console.log(data)
        if(data.rowCount==0){
            throw(error)
        }
    }catch(error){
        console.log('el error',error)
        let customError = 'No se pudo borrar el usuario';
        return customError;
    }finally{
        client.release()
    }
}

module.exports={
    getAllUsers,
    getUsersByNickname,
    getUserByNickname,
    createUserM,
    updateUserM,
    deleteUserM
}