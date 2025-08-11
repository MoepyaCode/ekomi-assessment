import { NextFunction, Request, Response } from "express";
import CustomerService from "./customer.service";

/**
 * Controller for customer endpoints.
 */
class CustomerController {
    private readonly customerService: CustomerService;

    constructor() {
        this.customerService = new CustomerService();
    }

    /**
     * GET /customers/:id - Get customer by ID.
     */
    getCustomerById = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { id } = request.params;
            const customer = await this.customerService.getCustomerById(id);
            response.status(200).json(customer);
        } catch (error) {
            next(error)
        }
    }

    /**
     * GET /customers - Get all customers.
     */
    getAllCustomers = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const customers = await this.customerService.getAllCustomers();
            response.status(200).json(customers);
        } catch (error) {
            next(error);
        }
    }
}

export default CustomerController