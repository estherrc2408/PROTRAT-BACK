const jwt = require('jsonwebtoken');
JWT_SECRET_KEY='anywayyouwannatalk';

const jwtGenerator = (iduser, nickname) => {
    console.log(process.env.JWT_SECRET_KEY)

    return new Promise((resolve, reject)=>{
        let payload = {iduser, nickname};
        jwt.sign(payload, JWT_SECRET_KEY, {expiresIn:'1h'},(error,token)=>{
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