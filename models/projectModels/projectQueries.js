const projectQueries={
    getAllProjectsQ:
    `
    SELECT *
    FROM projects
    `
    ,
    getUserProjectsQ:
    `
    SELECT idproject, iduser, project_date, title, subtitle, principal_img, publication_project
    FROM projects
    WHERE IdUser = $1
    `
    ,
    getOneProjectQ:
    `
    SELECT *
    FROM projects
    WHERE idproject = $1
    `
    ,
    createProjectQ:
    `
    INSERT INTO projects (iduser,project_date, title, subtitle, description, location, principal_img)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `
    ,
    updateProjectQ:
    `
    UPDATE projects
    SET (project_date,title,subtitle,description,location,principal_img)
	= ($1,$2,$3,$4,$5,$6)
    WHERE idproject=$7
    `
    ,
    deleteProjectQ:
    `
    DELETE
    FROM projects
    WHERE idproject = $1
    `
    ,

};

module.exports=projectQueries;