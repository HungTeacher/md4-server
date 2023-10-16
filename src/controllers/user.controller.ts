import {Request, Response} from "express";
import userModel, {NewUser} from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from '../services/jwt'

export default {
    register: async function (req: Request, res: Response) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        try {
            let newUser: NewUser = {
                ...req.body,
                createAt: new Date(Date.now()),
                updateAt: new Date(Date.now())
            }
            let modelRes = await userModel.register(newUser)
            return res.status(modelRes?.status ? 200 : 213).json(modelRes)

        } catch (err) {
            return res.status(500).json({
                message: "Cannot register from server"
            })
        }
    },
    login: async function (req: Request, res: Response) {
        try {
            let modelRes = await userModel.inforByUserName(req.body.userName)
            return res.status(200).json({
                message: "login successfully",
                token: jwt.createToken(modelRes.data, "1d")
            })
        } catch {
            return res.status(500).json({
                message: "Cannot register from server"
            })
        }
    },
    findAllUsers: async function (req: Request, res: Response) {
        try {
            let modelRes = await userModel.findAllUsers();
            return res.status(modelRes ? 200 : 214).json(modelRes)
        } catch (err) {
            return res.status(500).json({
                message: "Cannot get all users!"
            })
        }
    },
    findById: async function (req: Request, res: Response) {
        try {
            console.log("req.body", req.body)
            let userById = await userModel.findById(1)
            return res.status(200).json(userById)
        } catch(err) {
            return res.status(500).json({
                message: "Cannot get user!"
            })
        }
    }
}