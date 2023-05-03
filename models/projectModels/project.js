const {getAllProjectsQ,getUserProjectsQ,getOneProjectQ,createProjectQ,updateProjectQ,deleteProjectQ}= require('./projectQueries');

const {Pool} = require('pg');

//cambiar al pasar a Elephant
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'protratUsers',
    password: 'admin'
});

//OBTENER TODOS LOS PROYECTOS
const getAllProjectsM = async () =>{
    let client, response;
    try{
        client=await pool.connect()
        const data = await client.query(getAllProjectsQ)
        
        response=data.rows
    }catch(error){
        throw error
    }finally{
        client.release()
    }
    return response
}

//OBTENER TODOS LOS PROYECTOS DE UN USUARIO
const getUserProjectsM = async(id) =>{
    let client, response;
    try{
        client = await pool.connect();
        
        const data = await client.query(getUserProjectsQ,[id]);
        response = data.rows;
        if(response.length==0){
            customError = 'El usuario aun no tiene registros';
            throw customError
        }   
    }catch(error){
        return error;
    }finally{
        client.release()
    }
    
    return response
}
//OBTENER DATOS DE UN PROYECTO CONCRETO POR SU ID
const getOneProjectM = async(id) =>{
    console.log(id);
    let client, response;
    try{
        client = await pool.connect();
        const data = await client.query(getOneProjectQ,[id]);
        response = data.rows;   
    }catch(error){
        throw error;
    }finally{
        client.release()
    }
    
    return response
}

//CREAR UN NUEVO PROYECTO
const createProjectM = async (iduser,{project_date, title, subtitle, description, location, principal_img}) =>{
    let client;
    
    const values=[
        iduser,
        project_date,
        title,
        subtitle,
        description,
        location,
        principal_img
    ]
    console.log(values);
    try{
        client = await pool.connect();
        await client.query(createProjectQ,values);

    }catch(error){
        // if(typeof title=='undefined'||typeof subtitle=='undefined'||typeof description=='undefined'){
        //     const customError = 'Debes rellenar los campos requeridos';
        //     console.log(customError)
        //     return customError;
        // }

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

//ACTUALIZAR UN PROYECTO POR SU ID
const updateProjectM = async (pid,{project_date, title, subtitle, description, location, principal_img})=>{
    let client;
    let idproject = pid;
    try{
        const values = [
            project_date,
            title,
            subtitle,
            description,
            location,
            principal_img,
            idproject
        ];
        console.log(values);
        client = await pool.connect();
        await client.query(updateProjectQ,values);
    }catch(error){
        console.log(error);
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
const deleteProjectM = async (id) =>{
    let client, data;
    const idproject = id;
    try{
        client = await pool.connect();
        console.log(idproject)
        data =await client.query(deleteProjectQ,[idproject]);
        console.log(data)
        if(data.rowCount==0){
            throw(error)
        }
    }catch(error){
        console.log('el error',error)
        let customError = 'No se pudo borrar el proyecto';
        return customError;
    }finally{
        client.release()
    }
}



module.exports={
    getAllProjectsM,
    getUserProjectsM,
    getOneProjectM,
    createProjectM,
    deleteProjectM,
    updateProjectM
}