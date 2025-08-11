import { Router } from "express";
import OrderController from "./order.controller";

const controller = new OrderController()
const router = Router()

router.get("/", controller.getAllOrders)
router.get("/:id", controller.getOrderById)
router.patch("/:id/paid", controller.updateIsPaid)
router.get("/:orderId/items", controller.getOrderItemsByOrderId)

export { router as OrderRouter }