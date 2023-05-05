const validateQueries = {
    validateEmail:
    `
    SELECT iduser, email, password, nickname, rol
    FROM users
    WHERE email=$1;
    `
};

module.exports=validateQueries;