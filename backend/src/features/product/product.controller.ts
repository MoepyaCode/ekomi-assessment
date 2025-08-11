import { NextFunction, Request, Response } from "express";
import ProductService from "./product.service";

/**
 * Controller for product endpoints.
 */
class ProductController {
    private readonly productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    /**
     * GET /products/:id - Get product by ID.
     */
    getProductById = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { id } = request.params;
            const product = await this.productService.getProductById(id);
            response.status(200).json(product);
        } catch (error) {
            next(error)
        }
    }

    /**
     * GET /products - Get all products.
     */
    getAllProducts = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const products = await this.productService.getAllProducts();
            response.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController