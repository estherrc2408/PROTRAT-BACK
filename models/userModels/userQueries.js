const userQueries = {
    getAllUsersQ:
    `SELECT u.IdUser, u.Email, u.Nickname, u.First_Name, u.Last_Name, u.Birth_Date, u.City, u.Image, u.Rol, u.Instagram_nickname, u.Twitter_nickname, u.LinkedIn_url, COUNT(p.IdProject) AS num_projects
    FROM users AS u
    LEFT JOIN projects AS p ON u.IdUser = p.IdUser
    GROUP BY u.IdUser`,
    //trae todos los usuarios con todos sus datos saldo el password más una columna con el total proyectos que han realizado
    getUsersByNicknameQ:
    `SELECT iduser, email, nickname, first_name, last_name, birth_date,city,image,instagram_nickname,twitter_nickname,linkedin_url
    FROM users
    WHERE rol='standar' AND nickname LIKE '%' || $1 || '%'`,
    //trae todos los perfiles que tengan un nickname con las palabras contenidas en el search enviado
    getUserByIdQ:
    `SELECT u.IdUser, u.Email, u.Nickname, u.First_Name, u.Last_Name, u.Birth_Date, u.City, u.Image, u.Rol, u.Instagram_nickname, u.Twitter_nickname, u.LinkedIn_url, COUNT(p.IdProyect) AS num_proyects
    FROM users AS u
    LEFT JOIN proyects AS p ON u.IdUser = p.IdUser
	WHERE u.IdUser = $1
    GROUP BY u.IdUser`,
    //trae los datos de un usuario con un id concreto salvo su contraseña y con el plus de el n´´umero de proyectos que ha realizado
    createUserQ:
    `INSERT INTO users (Email,Password,Nickname,First_Name,Last_Name,Birth_Date,Rol)
    VALUES($1,$2,$3,$4,$5,$6,$7)`,
    //tan solo permite rellenar los datos del formulario de registro
    updateUserQ:
    `UPDATE users
    SET (email,password,nickname,first_name,last_name,birth_date,city,image,instagram_nickname,twitter_nickname,linkedin_url)
	= ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    WHERE idUser=$12`,
    //actualiza los doce valores del usuario con el id mandado en el $12
    deleteUserQ:
    `DELETE
    FROM users
    WHERE idUser=$1`

};
module.exports=userQueries;