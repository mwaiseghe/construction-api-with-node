const {v4} = require('uuid'); // import uuid from 'uuid'; // ES6 Modules
const projects = [];

const createProject = async (req, res) => { // access to the request and response objects
    try {
        const id = v4();

        const {project_name, description, project_location, startdate, enddate} = req.body;

        const newProject = {
            id, project_name, description, project_location, startdate, enddate
        }

        projects.push(newProject); // add new project to the projects array

        res.json({
            message: 'Project created successfully',
            project: newProject
        })

    } catch (error) {
        return res.json({
            error: error
        })
    }
}

const getProjects = async (req, res) => {
    try {
        res.json({
            projects: projects
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

        const project = projects.find(project => project.id === id);

        if (!project) {
            return res.json({
                message: 'Project not found'
            })
        }

        res.json({
            project: project
        })
    } catch (error) {
        return res.json({
            "error": error.message
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