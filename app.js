require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./DB/connect');
const customersRoute = require('./router/customer');
const productsRoute = require('./router/product');
const authMiddleware = require('./middleware/auth');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', customersRoute );
app.use('/api/v1', productsRoute );

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
