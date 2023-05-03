const { getAllProjectsM, getUserProjectsM, getOneProjectM, createProjectM, deleteProjectM, updateProjectM} = require ('../models/projectModels/project')

const getAllProjects = async (_req, res) => {
    let data;
    try {
        console.log('hallando todos los proyectos'); 
        data = await getAllProjectsM()
              
        res.status(200).json({
            ok: true,
            data
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al obtener los proyectos'
        })
    }
};
const getUserProjects = async (req,res) =>{
    let data;
    let {id} = req.params;
    try {
        if (id) {
            console.log('hallando proyectos del usuario');
            data = await getUserProjectsM(id);
        }
        //data puede ser: un array con los proyectos
        //                  un string de El usuario aun no tiene registros
        res.status(200).json({
            ok: true,
            data
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al obtener los proyectos del usuario'
        })
    }
}
const getOneProject = async(req,res)=>{
    let data;
    let {id} = req.params;
    try{
        if (id) {
            console.log('hallando un proyecto');
            data = await getOneProjectM(id);
        }

        res.status(200).json({
            ok: true,
            data
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error al obtener los proyectos del usuario'
        })
    }
}
/*
{
"iduser":"3",
"project_date":"2023-01-01",
"title":"Mercadillo medieval",
"subtitle":"No es benefico",
"description":"odiamos a la alcaldesa Miniserie de 5 episodios que cuenta la historia real de cómo los saboteadores políticos de Nixon y los autores intelectuales del Watergate derrocaron accidentalmente la presidencia que estaban tratando de protege",
"location":"El Alamo",
"principal_img":"https://i.blogs.es/a13db0/castor/450_1000.jpg"
}
*/
const createProject = async (req,res) => {
    let {body} = req;
    const iduser =req.params.id;
    try {
        const petition = await createProjectM(iduser,body);
        console.log(petition);
        if (typeof petition == 'string') {
            res.status(404).json({
                ok: true,
                msg: petition
            })
        } else {
            res.status(200).json({
                ok: true,
                msg: 'Nuevo proyecto creado'
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el proyecto'
        })
    }
};

const updateProject = async (req, res) => {

    const { body } = req;
    const { pid } = req.params;//id del proyecto a editar
    console.log(req.params , req.query);
    try {
        const petition = await updateProjectM(pid,body);
        if (typeof petition=='string') {
            console.log(petition)
            res.status(404).json({
                ok: true,
                msg: petition
            })
        } else {
            res.status(200).json({
                ok: true,
                msg: 'Proyecto editado'
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al editar el proyecto'
        })
    }
};

const deleteProject = async (req, res) => {

    let {pid}=req.params;
    console.log(req.params,req.query)
    try {
        const petition = await deleteProjectM(pid);
        if (typeof petition=='string') {
            res.status(404).json({
                ok: false,
                msg: petition
            })
        } else {
            res.status(200).json({
                ok: true,
                msg: 'Proyecto borrado'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar el proyecto'
        })
    }
};


module.exports = {
    getAllProjects,
    getUserProjects,
    getOneProject,
    createProject,
    deleteProject,
    updateProject
};