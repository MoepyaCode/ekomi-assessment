import { Router } from "express";
import ProductController from "./product.controller";

const controller = new ProductController()
const router = Router()

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);

export {router as ProductRouter}