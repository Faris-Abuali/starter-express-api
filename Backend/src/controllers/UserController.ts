import { NextFunction, Request, Response } from "express";
import { User } from '../models';
import bcrypt from "bcrypt";
import crypto from "crypto";
import { AddedUser, BaseResponse } from "../types";
import { sendEmail } from "../services/email"

class UserController {
    constructor() {
        this.generateAccount = this.generateAccount.bind(this);
        // this.handleAddUser = this.handleAddUser.bind(this);
        this.addUser = this.addUser.bind(this);
        // this.sendEmail = this.sendEmail.bind(this);

    }

    async addUser(user: AddedUser) {
        const { username, password, email, saltRounds, roleId } = user;
        const text = `Hello! this is a message from PTUK training system.
                      theses login credentials for your account on the PTUK training system, which you can use to access our platform 
                      username: ${username} 
                      password: ${password}
                      Please note that your password is confidential and should not be shared with anyone.`
        const subject = "login credentials"
        sendEmail(email, subject, text);
        const hashedPwd = await bcrypt.hash(password, saltRounds);
        const record = await User.create({
            username,
            password: hashedPwd,
            email,
            roleId,
        });
        return record.id as number;
    }

    async generateAccount(firstValue: string, secondValue: string): Promise<{ temp: string; password: string; }> {
        const first = firstValue.split(" ")[0].toLocaleLowerCase();
        const second = secondValue.slice(0, 2).toLocaleLowerCase();

        const password = crypto.randomBytes(8).toString("hex"); //random string for password
        console.log(password);
        const username = first + "." + second;
        var suffix = 1;
        var record = await User.findOne({ where: { username } });
        var temp = username;
        if (record) {
            while (record) {
                temp = username + suffix;
                record = await User.findOne({ where: { username: temp } });
                suffix++;
            }
        }

        return { temp, password };
    }

    async handleAddUser(req: Request, res: Response<BaseResponse>, next: NextFunction) { // I think we should cancel this request!, not completely finished
        try {
            const { username, email, password, roleId } = req.body;
            const saltRounds = 10;
            const id = await this.addUser({
                username,
                password,
                email,
                saltRounds,
                roleId
            });
            if (id)
                return res.json({
                    success: true,
                    status: res.statusCode,
                    message: "Successfully create User",
                    data: id
                });
        } catch (err) {
            next(err);
        }
    }

    async getAll(req: Request, res: Response<BaseResponse>, next: NextFunction) {
        try {
            const records = await User.findAll();
            return res.json({
                success: true,
                status: res.statusCode,
                message: "Users:",
                data: records
            });
        } catch (err) {
            next(err);
        }
    }

    async deleteUserByPK(req: Request, res: Response) {
        try {
            let { username } = req.params;
            const deletedUser = await User.destroy({
                where: { username },
            });
            if (!deletedUser) return res.json("something went wrong");
            return res.json("success");
        } catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: "/read" });
        }
    }

    sendCode = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {

        try {
            const { email } = req.body;
            const user = await User.findOne({ where: { email }, attributes: ['email'] }); //just email
            if (!user) {
                return res.json({
                    success: false,
                    status: res.statusCode,
                    message: "invalid gmail"
                });
            }

            else {
                let message = ` <a href="${req.protocol}://${req.headers.host}/api/v1/user/enterData">reset password</a> `;
                sendEmail(email, 'Forget Password', message);
                return res.json({
                    success: true,
                    status: res.statusCode,
                    message: "code sent successfully"
                });
            }
        } catch (err) {
            next(err);
        }

    }
    enterData = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        return res.json({
            success: true,
            status: res.statusCode,
            message: "Enter Data"
        });
    }

    forgetPassword = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        const { email, newPassword } = req.body;

        const hash = await bcrypt.hash(newPassword, 10);
        const user = await User.findOne({ where: { email } }); //just email
        await User.update({ password: hash }
            , { where: { id: user?.id } });

        return res.json({
            success: true,
            status: res.statusCode,
            message: "password updated successfully",
            data: newPassword
        });

    }

    resetPassword = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
        try {
            const { oldPassword, newPassword } = req.body;

            const username = req.user.username;
            const user = await User.findOne({
                where: { username }
            });


            if (user) {
                const isCorrect = await bcrypt.compare(oldPassword, user?.password)
                if (isCorrect) {
                    const hash = await bcrypt.hash(newPassword, 10);
                    await User.update({ password: hash }
                        , { where: { id: user?.id } });

                    return res.json({
                        success: true,
                        status: res.statusCode,
                        message: "password updated successfully",
                        data: newPassword
                    });


                }
                else {
                    return res.json({
                        success: false,
                        status: res.statusCode,
                        message: "password is incorrect"
                    });
                }
            }
        } catch (err) {
            next(err);
        }
    }

}
export default new UserController();

