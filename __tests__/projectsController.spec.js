import mssql from 'mssql';
import { deleteProject, getProject, getProjects, updateProject } from '../Controllers/projectsController';

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe("Projects Controller Tests", () => {
    describe("Get All Projects", () => {
        it("Should return all projects", async () => {
            // Arrange
            const req = {
                query: {}
            }

            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: [{
                        id: 1,
                        project_name: "Project 1",
                        project_description: "Project 1 Description",
                        project_start_date: "2020-01-01",
                        project_end_date: "2020-02-01",
                        project_status: "Active"
                    }]
                })
            })

            // Act
            await getProjects(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                projects: [{
                    id: expect.any(String),
                    project_name: "Project 1",
                    description: "Project 1 Description",
                    project_start_date: "2020-01-01",
                    project_end_date: "2020-02-01",
                    project_status: "Active"
                }]
            })
        })
    })

    describe("Get Project By Id", () => {
        it("Should return a project by id", async () => {

            const project_id = "1";
            const mockProject = {
                id: expect.any(String),
                project_name: "Project 1",
                description: "Project 1 Description",
                project_start_date: "2020-01-01",
                project_end_date: "2020-02-01",
                project_status: "Active"
            }

            const req = {
                params: {
                    id: project_id
                }
            }

            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: [mockProject]
                })

            })

            await getProject(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                project: [mockProject]
            })
        })
    })

    describe("Update Project", () => {
        it("Should update a project successfully", async () => {
            const project_id = "1";
            const updated_project = {
                project_name: "Project 1",
                description: "Project 1 Description",
                project_location: "Project 1 Location",
                startdate: "2020-01-01",
                enddate: "2020-02-01"
            }
           
            const req = {
                params: {
                    id: project_id
                },
                body: updated_project
            }

            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(), // mockReturnThis() returns the object that the function was called on
                input: jest.fn().mockReturnThis(), // mockReturnThis() returns the object that the function was called on
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })
            await updateProject(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Project updated successfully',
                project: {
                    updated_project
                }
            })
        })

        it("Should return an error if project is not found", async () => {
            const project_id = "1";
            const updated_project = {
                project_name: "Project 1",
                description: "Project 1 Description",
                project_location: "Project 1 Location",
                startdate: "2020-01-01",
                enddate: "2020-02-01"
            }

            const req = {
                params: {
                    id: project_id
                },
                body: updated_project
            }

            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(), // mockReturnThis() returns the object that the function was called on
                input: jest.fn().mockReturnThis(), // mockReturnThis() returns the object that the function was called on
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })
            await updateProject(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Project not found'
            })
        })

        describe("Delete Project", () => {
            it("Should delete a project successfully", async () => {
                const project_id = "1";
                
                const req = {
                    params: {
                        id: project_id
                    }
                }

                // Arrange
                jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                    request: jest.fn().mockReturnThis(), // mockReturnThis() returns the object that the function was called on
                    input: jest.fn().mockReturnThis(), // mockReturnThis() returns the object that the function was called on
                    execute: jest.fn().mockResolvedValueOnce({
                        rowsAffected: [1]
                    })
                })

                // Act
                await deleteProject(req, res);

                // Assert
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith({
                    message: 'Project deleted successfully'
                })
            })

            it("Should return an error if project is not found", async () => {
                const project_id = "1";
                
                const req = {
                    params: {
                        id: project_id
                    }
                }

                // Arrange
                jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                    request: jest.fn().mockReturnThis(), // mockReturnThis() returns the object that the function was called on
                    input: jest.fn().mockReturnThis(), // mockReturnThis() returns the object that the function was called on
                    execute: jest.fn().mockResolvedValueOnce({
                        rowsAffected: [0]
                    })
                })

                // Act
                await deleteProject(req, res);

                // Assert
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalledWith({
                    message: 'Project not found'
                })
            }
        })
    })
})
