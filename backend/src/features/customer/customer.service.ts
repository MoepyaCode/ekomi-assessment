import CustomerDAO from "./customer.dao"

/**
 * Service class for handling customer-related business logic.
 */
class CustomerService {
    private readonly customerDao: CustomerDAO

    /**
     * Initializes the CustomerService with required DAO.
     */
    constructor() {
        this.customerDao = new CustomerDAO()
    }

    /**
     * Retrieves a customer by their ID.
     * @param id - The unique identifier of the customer
     * @returns Promise that resolves to the customer object or undefined if not found
     */
    public getCustomerById = async (id: string) => {
        return this.customerDao.getCustomerById(id);
    }

    /**
     * Retrieves all customers.
     * @returns Promise that resolves to an array of all customers
     */
    public getAllCustomers = async () => {
        return this.customerDao.getAllCustomers();
    }
}

export default CustomerService