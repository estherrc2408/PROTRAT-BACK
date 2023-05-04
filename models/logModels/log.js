const {validateEmail,validatePass}=require('./logQueries');

const {Pool} = require('pg');

//cambiar al pasar a Elephant
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'protratUsers',
    password: 'admin'
});


const validateLogM = async({email,password})=>{
    let client, response;
    console.log(email, password)
    try{
        client = await pool.connect();
        const data = await client.query(validateEmail,[email]);
        response = data.rows;
        if(response.length==0){
            const customError = 'Credenciales no coincidentes'
            return customError;
        }else{
            const user=response.shift();
            const validate = await client.query(validatePass,[email,user.password]);
            const responseValidator = validate.rows;
            // console.log(responseValidator);
            if(responseValidator.length==0){
                const customError = 'Credenciales no coincidentes'
                return customError;
            }else{
                const nick=responseValidator.shift();
                return nick;
            }
        }
    }catch(error){
        console.log(error)
    }finally{
        client.release()
    }
};

module.exports = {
    validateLogM
}