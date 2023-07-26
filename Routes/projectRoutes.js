const {Router} = require('express'); // import express router
const { createProject, getProjects, getProject, updateProject, deleteProject } = require('../Controllers/ProjectsController');
const { verifyToken } = require('../Middleware/verifyToken');

const router = Router(); // initialize express router

router.post('/projects/', verifyToken, createProject); // create a project
router.get('/projects/', getProjects); // get all projects
router.get('/projects/:id', getProject); // get a single project
router.put('/projects/:id', verifyToken, updateProject); // update a project
router.delete('/projects/:id', verifyToken, deleteProject); // delete a project

module.exports = {
    routes: router
}