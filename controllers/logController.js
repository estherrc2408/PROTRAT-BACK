const {validateLogM} = require('../models/logModels')

const validateLog = async(req,res)=>{
    let {body} = req;
    try{
        const petition = await validateLogM(body);

    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Error al validar'
        })
    }

}
module.exports={
    validateLog
}