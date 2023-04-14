import {NextFunction, Request, Response} from "express";
import {Student} from '../models';
import UserController from "./UserController";
import {GeneratedResponse} from "../types";

interface StudentRequestBody extends Request {
    body: {
        id: string;
        name: string;
        phoneNumber: string;
        email: string;
        userId: number;
    }
}

class studentController {
    constructor() {
        this.addStudent = this.addStudent.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    async addStudent(req: StudentRequestBody, res: Response, next: NextFunction) {
        try {
            const {id, name, email, phoneNumber} = req.body;

            const student = await Student.findByPk(id);

            if (student) {
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "student already exists",
                    data: student
                })
            }

            const {temp, password} = await UserController.generateAccount(name, phoneNumber);

            const user = await UserController.addUser(temp, password, email, 10, 6); // company roleID in DataBase

            const studentRecord = await Student.create({
                id,
                name,
                phoneNumber,
                userId: user,
            });

            if (!studentRecord) {
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "error creating Student account"
                });
            }
            return res.json({
                success: true,
                status: res.statusCode,
                message: "success adding student",
                data: studentRecord
            });
        } catch (err) {
            next(err);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const records = await Student.findAll({});
            let response: GeneratedResponse = {
                success: true,
                status: res.statusCode,
                message: "Student: ",
                data: records
            }
            return res.json(response);
        } catch (err) {
            next(err);
        }
    }


    



    // async deleteStudentById(req: Request, res: Response) {
    //     try {
    //         let { id } = req.params;
    //         // const record = await Student.findByPk(id);
    //         const deletedStudent = await Student.destroy({
    //             where: { id: id },
    //         });
    //         if (!deletedStudent) return res.json("something went wrong");
    //         return res.json("success");
    //     } catch (e) {
    //         return res.json({ msg: "fail to read", status: 500, route: "/read" });
    //     }
    // }
}

export default new studentController();