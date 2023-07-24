const {Router} = require('express'); // import express router
const { createProject, getProjects, getProject, updateProject, deleteProject } = require('../Controllers/ProjectsController');

const router = Router(); // initialize express router

router.post('/projects/', createProject); // create a new project
router.get('/projects/', getProjects); // get all projects
router.get('/projects/:id', getProject); // get a single project
router.put('/projects/:id', updateProject); // update a project
router.delete('/projects/:id', deleteProject); // delete a project

module.exports = {
    routes: router
}