import { Router } from "express";
import CustomerController from "./customer.controller";

const controller = new CustomerController()
const router = Router()

router.get("/", controller.getAllCustomers)
router.get("/:id", controller.getCustomerById)

export {router as CustomerRouter}