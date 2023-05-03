const validateQueries = {
    validateEmail:
    `
    SELECT email, password
    FROM users
    WHERE email=$1
    `
    ,
    validatePass:``

};

module.exports=validateQueries;