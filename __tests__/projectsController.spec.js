// Mocking the mssql module
const mssql = require('mssql');

import { deleteProject, getProject, getProjects, updateProject } from '../Controllers/projectsController';

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe("Projects Controller Tests", () => {
    describe("Get all Projects", () => {
        it("Should get all projects", async () => {
            // Arrange
            const projects_list = [
                {
                    "id": "21865b4d-776f-4cfb-aaf5-960473858502",
                    "project_name": "Django Project Updated 11",
                    "description": "Work on the Daraja Django Project Next 11",
                    "project_location": "Buruburu 59",
                    "startdate": "2020-01-01T00:00:00.000Z",
                    "enddate": "2020-02-01T00:00:00.000Z"
                },
                {
                    "id": "5eec275c-94ea-4521-b3cb-1bc5a03c74b5",
                    "project_name": "Django Project Updated 11",
                    "description": "Work on the Daraja Django Project Next 11",
                    "project_location": "Buruburu 59",
                    "startdate": "2020-01-01T00:00:00.000Z",
                    "enddate": "2020-02-01T00:00:00.000Z"
                }
            ]

            const req = {}

            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: projects_list
                })
            });

            await getProjects(req, res);

            // Assert
            // console.log(res.status);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                projects: projects_list,
            })
        })
    })



    describe("Get a single Project", () => {
        it("Should get a single project", async () => {
            // Arrange
            const project_id = "21865b4d-776f-4cfb-aaf5-960473858502";
            const project = {
                "id": "21865b4d-776f-4cfb-aaf5-960473858502",
                "project_name": "Django Project Updated 11",
                "description": "Work on the Daraja Django Project Next 11",
                "project_location": "Buruburu 59",
                "startdate": "2020-01-01T00:00:00.000Z",
                "enddate": "2020-02-01T00:00:00.000Z"
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
                    recordset: project
                })
            });

            await getProject(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                project: project
            })
        })
    })

    // describe("create a Project", () => {
    //     it("Should create a project", async () => {
    //         // Arrange
    //         const mockedInput = jest.fn().mockReturnThis();
    //         const mockedExecute = jest.fn().mockResolvedValueOnce({
    //             project: {
    //                 "id": "21865b4d-776f-4cfb-aaf5-960473858502",
    //                 "project_name": "Django Project Updated 11",
    //                 "description": "Work on the Daraja Django Project Next 11",
    //                 "project_location": "Buruburu 59",
    //                 "startdate": "2020-01-01T00:00:00.000Z",
    //                 "enddate": "2020-02-01T00:00:00.000Z"
    //             }
    //         });

    //         const mockedRequest = {
    //             input: mockedInput,
    //             execute: mockedExecute
    //         }

    //         const mockedPool = {
    //             request: jest.fn().mockReturnValue(
    //                 mockedRequest
    //             )
    //         }

    //         jest.spyOn(mssql, 'connect').mockResolvedValueOnce(mockedPool);

    //         // Act
    //         await getProject({params: {id: "21865b4d-776f-4cfb-aaf5-960473858502"}}, res);

    //         // Assert
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith({
    //             project: project
    //         })
    //     })
    // })
})