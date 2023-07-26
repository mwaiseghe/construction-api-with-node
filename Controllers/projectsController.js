const {v4} = require('uuid'); // import uuid from 'uuid'; // ES6 Modules
const sqlConfig = require('../config/config');
const projects = [];

class Project {
    constructor(id, project_name, description, project_location, startdate, enddate) {
        this.id = id;
        this.project_name = project_name;
        this.description = description;
        this.project_location = project_location;
        this.startdate = startdate;
        this.enddate = enddate;
    }
}

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
                    console.log(result);
                }
            });
        }
        catch (error) {
            return res.json({
                console.log(error);
            })
        }
    }


const getProjects = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        const allProjects = await pool.request().execute('sp_get_projects', (err, result) => {
            if (err instanceof mssql.RequestError) {
                console.log(err);
            }
            else if (err) {
                console.log(err);
            }
            else {
                res.json({
                    projects: result.recordset
                })
            }
        });
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

const getProject = async (req, res) => {
    try {
        const {id} = req.params;

        const pool = await mssql.connect(sqlConfig); // connect to the database

        const project = await pool.request()
            .input('id', mssql.VarChar, id)
            .execute('sp_get_project', (err, result) => {
                if (err instanceof mssql.RequestError) {
                    console.log(err);
                }
                else if (err) {
                    console.log(err);
                }
                else {
                    res.json({
                        project: result.recordset[0]
                    })
                }
            });
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

const updateProject = async (req, res) => {
    try {
        const {id} = req.params;

        const project = projects.find(project => project.id === id);

        if (!project) {
            return res.json({
                message: 'Project not found'
            })
        }

        const {project_name, description, project_location, startdate, enddate} = req.body;

        project.project_name = project_name || project.project_name;
        project.description = description || project.description;
        project.project_location = project_location || project.project_location;
        project.startdate = startdate || project.startdate;
        project.enddate = enddate || project.enddate;

        res.json({
            message: 'Project updated successfully',
            project: project
        })
    } catch (error) {
        return res.json({
            error: error.message
        })
    }

    
}

const deleteProject = async (req, res) => {
    try {
        const {id} = req.params;

        const project = projects.find(project => project.id === id);

        if (!project) {
            return res.json({
                message: 'Project not found'
            })
        }

        // find the index of the project, and remove it from the projects array
        const projectIndex = projects.findIndex(project => project.id === id);

        // splice the project from the projects array, using the projectIndex
        projects.splice(projectIndex, 1);

        res.json({
            message: 'Project deleted successfully'
        })
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