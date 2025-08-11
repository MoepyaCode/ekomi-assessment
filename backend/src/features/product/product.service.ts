import ProductDAO from "./product.dao";

/**
 * Service class for handling product-related business logic.
 */
class ProductService {
    private productDAO: ProductDAO;

    /**
     * Initializes the ProductService with required DAO.
     */
    constructor() {
        this.productDAO = new ProductDAO();
    }

    /**
     * Retrieves a product by its ID.
     * @param id - The unique identifier of the product
     * @returns Promise that resolves to the product object or undefined if not found
     */
    public getProductById = async (id: string) => {
        return this.productDAO.getProductById(id);
    }

    /**
     * Retrieves all products.
     * @returns Promise that resolves to an array of all products
     */
    public getAllProducts = async () => {
        return this.productDAO.getAllProducts();
    }
}

export default ProductService