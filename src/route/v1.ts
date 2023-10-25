import express from 'express'

const router = express.Router()
import userApi from "./apis/user.api";
import categoryApi from "./apis/category.api";
import productApi from './apis/product.api';
import collectionApi from "./apis/collection.api";


router.use('/products', productApi);
router.use('/users', userApi)
router.use('/categories', categoryApi)
router.use('/collections', collectionApi)

export default router;