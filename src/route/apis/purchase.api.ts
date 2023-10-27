import express from 'express'
const router = express.Router()

import purchaseController from "../../controllers/purchase.controller";

// router.get("/customer-order",  purchaseController.findUserReceipt)
router.post("/", purchaseController.createUserReceipt)
router.post("/", purchaseController.createUserReceipt)

export default router