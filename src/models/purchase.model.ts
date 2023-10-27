import {PrismaClient, ReceiptPayMode, ReceiptState } from "@prisma/client";

const prisma = new PrismaClient()

//Guest
interface NewGuestReceiptDetail {
    productId: number;
    quantity: number;
}

interface GuestReceiptDetail extends NewGuestReceiptDetail {
    id: string;
    guestReceiptId: string;
}

interface NewGuestReceipt {
    email: string;
    phoneNumber: string;
    total: number;
    payMode: ReceiptPayMode;
    paid?: boolean;
}

interface GuestReceipt extends NewGuestReceipt {
    id: string;
    state?: ReceiptState;
    createAt: Date;
    acceptTime?: Date;
    shippingTime?: Date;
    doneTime?: Date;
    guestReceiptDetail: GuestReceiptDetail
}

//User
interface NewUserReceiptDetail {
    productId: number;
    quantity: number;
}

interface UserReceiptDetail extends NewUserReceiptDetail {
    id: string;
    userReceiptId: string
}

interface NewUserReceipt {
    total: number;
    payMode: ReceiptPayMode;
    paid?: boolean;
}

interface UserReceipt extends NewUserReceipt {
    id: string;
    state?: ReceiptState;
    createAt: Date;
    acceptTime?: Date;
    shippingTime?: Date;
    doneTime?: Date;
    userReceiptDetail: UserReceiptDetail[]
}

export default {
    createGuestReceipt: async function (newGuestReceipt: NewGuestReceipt, guestReceiptDetailList: NewGuestReceiptDetail[]) {
        try {
            let receipt = await prisma.guestReceipts.create({
                data: {
                    ...newGuestReceipt,
                    guestReceiptDetail: {
                        createMany: {
                            data: guestReceiptDetailList
                        }
                    }
                },
                include: {
                    guestReceiptDetail: {
                        include: {
                            product: true
                        }

                    }
                }
            })
            return {
                status: true,
                message: "orderSuccess",
                data: receipt
            }
        } catch(err) {
            return {
                status: false,
                message: "Model Error",
                data: null
            }
        }
    },
    createUserReceipt: async function (newUserReceipt: NewUserReceipt, userReceiptDetailList: NewUserReceiptDetail[],  userId: number) {
        try {
            let receipt = await prisma.userReceipts.create({
                data: {
                    ...newUserReceipt,
                    user: { connect: { id: userId}},
                    userReceiptDetail: {
                        createMany: {
                            data: userReceiptDetailList
                        }
                    }
                },
                include: {
                    userReceiptDetail: true
                }
            })
            return {
                status: true,
                message: "orderSuccess",
                data: receipt
            }
        } catch(err) {
            return {
                status: false,
                message: "model error",
                data: null
            }
        }
    }
}