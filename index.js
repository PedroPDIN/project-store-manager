require('dotenv').config();
const express = require('express');
const ProductsControllers = require('./controllers/products.controller');
const SalesControllers = require('./controllers/sales.controller');
const { isValidNameProduct, isValidQuantityProduct } = require('./middlewares/isValidProducts');
const { isValidProductIdSales, isValidQuantitySales } = require('./middlewares/isValidSales');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', ProductsControllers.getByIdController);
app.get('/products', ProductsControllers.getAllController);
app.get('/sales', SalesControllers.getAllController);
app.get('/sales/:id', SalesControllers.getByIdController);

app.post('/products',
isValidNameProduct,
isValidQuantityProduct,
ProductsControllers.insertProductController);

app.post('/sales', 
isValidProductIdSales,
isValidQuantitySales,
SalesControllers.insertSaleController);

app.put('/products/:id',
isValidNameProduct,
isValidQuantityProduct,
ProductsControllers.updateProductController);

app.put('/sales/:id',
isValidProductIdSales,
isValidQuantitySales,
SalesControllers.updateSaleController);

app.delete('/products/:id',
ProductsControllers.deleteProductController);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
