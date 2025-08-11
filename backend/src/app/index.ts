import express from 'express'
import cors from 'cors'
import { errorHandler } from '../error/error.middleware'
import { DbTables } from '../db/enums/tables.enum'
import { CustomerRouter } from '../features/customer/customer.route'
import { ProductRouter } from '../features/product/product.route'
import { OrderRouter } from '../features/order/order.route'

class App {
  private app: express.Application
  private port: number

  constructor(port: number) {
    this.app = express()
    this.port = port
  }

  public initialize = () => {
    this.middleware()
    this.routes()
    this.errorMiddleware()
  }

  private middleware = () => {
    this.app.use(express.json())
    this.app.use(cors())
  }

  private routes = () => {
    this.app.get('/', (req, res) => {
      res.send({message: 'hello world'})
    })

    const base = '/api';
    this.app.use(`${base}/customers`, CustomerRouter)
    this.app.use(`${base}/products`, ProductRouter)
    this.app.use(`${base}/orders`, OrderRouter)
  }

  private errorMiddleware = () => {
    this.app.use(errorHandler)
  }

  public start = () => {
    this.app.listen(this.port, () => console.log(`Running on http://localhost:${this.port}`))
  }
}

export default App
