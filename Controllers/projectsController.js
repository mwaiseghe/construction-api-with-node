const {v4} = require('uuid'); // import uuid from 'uuid'; // ES6 Modules
const {sqlConfig, mssql} = require('../config/config');

const createProject = async (req, res) => { // access to the request and response objects
    try {
        const id = v4();

        const {project_name, description, project_location, startdate, enddate} = req.body;

        const pool = await mssql.connect(sqlConfig);

        await pool.request()
            .input('id', mssql.VarChar, id)
            .input('project_name', mssql.VarChar, project_name)
            .input('description', mssql.VarChar, description)
            .input('project_location', mssql.VarChar, project_location)
            .input('startdate', mssql.Date, startdate)
            .input('enddate', mssql.Date, enddate)
            .execute('sp_create_project', (err, result) => {
                if (err instanceof mssql.RequestError) {
                    console.log(err);
                }
                else if (err) {
                    console.log(err);
                }
                else {
                    res.status(201).json({
                        message: 'Project created successfully',
                        project: result.recordset
                    })
                }
            });
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}


const getProjects = async (req, res) => {
    try {
        const pool = await (mssql.connect(sqlConfig))

        const allprojects = (await pool.request().execute('sp_getprojects')).recordset;

        return res.status(200).json({
            projects: allprojects
        })
        
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

const getProject = async (req, res) => {
    try {
        const {id} = req.params;

        const pool = await (mssql.connect(sqlConfig))

        const project = (await pool.request()
            .input('id', mssql.VarChar, id)
            .execute('getProjectbyIDProc')).recordset;

        if (project.length === 0) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        return res.status(200).json({
            project: project
        })

    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}



const updateProject = async (req, res) => {
    try {
        const {id} = req.params;

        const {project_name, description, project_location, startdate, enddate} = req.body;

        const pool = await mssql.connect(sqlConfig);

        const project = await pool.request()
            .input('id', mssql.VarChar, id)
            .input('project_name', mssql.VarChar, project_name)
            .input('description', mssql.VarChar, description)
            .input('project_location', mssql.VarChar, project_location)
            .input('startdate', mssql.Date, startdate)
            .input('enddate', mssql.Date, enddate)
            .execute('updateProjectProcedure', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: err.message
                    })
                }

            });
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

const deleteProject = async (req, res) => {
    try {
        const {id} = req.params;

        const pool = await mssql.connect(sqlConfig);
        
        const checkIfProjectExists = await pool.request()
            .input('id', mssql.VarChar, id)
            .execute('getProjectbyIDProc', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: err.message
                    })
                }
                else if (result.recordset.length === 0) {
                    res.status(404).json({
                        message: 'Project not found'
                    })
                }
            });

        await pool.request()
            .input('id', mssql.VarChar, id)
            .execute('deleteProjectProcedure', (err, result) => {
                if (err instanceof mssql.RequestError) {
                    console.log(err);
                    res.status(500).json({
                        message: err.message
                    })
                }
                else if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: err.message
                    })
                }
                else {
                    res.status(200).json({
                        message: 'Project deleted successfully',
                        project: result.recordset
                    })
                }
         });
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
}