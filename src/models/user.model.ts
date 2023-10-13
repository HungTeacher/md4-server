
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

// export type Address = {
//     id: string
//     title: string
//     provinceId: number
//     provinceName: string
//     districtId: number
//     districtName: string
//     wardCode: string
//     wardName: string
// }


export interface NewUser {
    email: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    createAt: Date,
    updateAt?: Date,
    // address?: Address[]
}

export default {
    register: async function (newUser: NewUser) {
        try {
            let user = await prisma.users.create({
                data: newUser
            })
            return {
                status: true,
                data: user,
                message: "register successfully"
            }
        } catch (err) {
            console.log("error", err)
        }
    },
    inforByUserName: async  function (userName: string) {
        try {
            let user = await  prisma.users.findUnique({
                where: {
                    userName
                }
            })
            if(!user) {
                return {
                    status: false,
                    message: "Ten dang nhap khong ton tai"
                }
            } 
            return {
                status: true,
                data: user,
                message: "Lay thong tin thanh cong"
            }
        } catch(err){
            let message: string = 'modelErr'
            return {
                status: false,
                data: null,
                message
            }
        }
    }
}