const {validateEmail}=require('./logQueries');
const {jwtGenerator} = require('../../helpers/jws')
//bcrypt
const bcryptjs = require ('bcryptjs');


const {Pool} = require('pg');

//cambiar al pasar a Elephant
const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DDBB,
    password: process.env.PASS
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
            console.log('email existe')
            const user=response.shift();
            // const validate = await client.query(validatePass,[email,user.password]);
            // const responseValidator = validate.rows;
            // console.log(responseValidator);
            const passUser= bcryptjs.compareSync(password,user.password);
            if(!passUser){
                const customError = 'Credenciales no coincidentes'
                return customError;
            }else{
                const token = await jwtGenerator(user.iduser,user.nickname); 
                const obj={...user,token}
                console.log(obj);
                return obj;
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