const validateQueries = {
    validateEmail:
    `
    SELECT email, password
    FROM users
    WHERE email=$1;
    `
    ,
    validatePass:
    `
    SELECT nickname
    FROM users
    WHERE email=$1 AND password=$2
    `

};

module.exports=validateQueries;