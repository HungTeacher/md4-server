import express from 'express'

const router = express.Router()
import userApi from "./apis/user.api";
import categoryApi from "./apis/category.api";
import productApi from './apis/product.api';


router.use('/products', productApi);
router.use('/users', userApi)
router.use('/categories', categoryApi)

export default router;