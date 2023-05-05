const validateQueries = {
    validateEmail:
    `
    SELECT iduser, email, password, nickname
    FROM users
    WHERE email=$1;
    `
};

module.exports=validateQueries;