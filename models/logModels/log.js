const {validateEmail,validatePass}=require('./logQueries');

const validateLogM = async({email,password})=>{
    let client, response;
    try{
        client = await pool.connect();
        const data = await client.query(validateEmail,[email]);
        response = data.rows;
        console.log(response);
    }catch(error){

    }finally{
        client.release()
    }
};

module.exports = {
    validateLogM
}