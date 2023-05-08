const {validateLogM} = require('../models/logModels/log')

const validateLog = async(req,res)=>{
    let {body} = req;
    console.log(body)
    
    try{
        const petition = await validateLogM(body);
        console.log(petition);
        if(petition.nickname){
            res.status(200).json({
                ok:true,
                msg:`Welcome ${petition.nickname}!`,
                id:petition.iduser,
                nickname:petition.nickname,
                token:petition.token,
                rol:petition.rol
            })
        }else{
            res.status(404).json({
                ok:false,
                msg:petition
            })
        }     
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