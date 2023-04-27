const {getAllUsersQ, getUsersByNicknameQ, getUserByIdQ, createUserQ, updateUserQ, deleteUserQ} = require('./userQueries');

const {Pool} = require('pg');


//cambiar al pasar a Elephant
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'protratUsers',
    password: 'admin'
});
//OBTENER TODOS LOS USUARIOS
const getAllUsers = async () =>{
    try{
        const client=await pool.connect()
        const data = await client.query(getAllUsersQ)
        console.log(data);
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
    try{
        const client = await pool.connect();
        const data = await client.query(getUsersByNicknameQ,[`%${search}%`]);
        const response = data.rows;
    }catch(error){
        throw error;
    }finally{
        client.release()
    }
    return response
}

//OBTENER USUARIO POR SU ID
const getUserById = async (id) =>{
    try{
        const client = await pool.connect();
        const data = await client.query(getUserByIdQ,[id]);
        const response = data.rows;
    }catch(error){
        throw error;
    }finally{
        client.release()
    }
    return response
}
