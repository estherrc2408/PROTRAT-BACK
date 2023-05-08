const jwt = require('jsonwebtoken');

const jwtGenerator = (iduser, nickname) => {

    return new Promise((resolve, reject)=>{
        let payload = {iduser, nickname};
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:'1h'},(error,token)=>{
            if (error) {
                reject('error al generar el token')
            }
            resolve(token)
        })
    })
}

module.exports = {
    jwtGenerator
}