require('dotenv').config()
const connectDB = require('./DB/connect')
const products = require('./product.json')
const product = require('./models/products')

const start =  async () => {
try {
    await connectDB(process.env.MONGO_URI)
    await products.deleteMany()
    await product.create(products)
    console.log('success!!!');
    process.exit(0)
} catch (error) {
    console.log(error);
    process.exit(1)
}
}
start()