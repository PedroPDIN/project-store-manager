require('dotenv').config();
const express = require('express');
const ProductsControllers = require('./controllers/products.controller');
const SalesControllers = require('./controllers/sales.controller');
const { isValidNameProduct, isValidQuantityProduct } = require('./middlewares/isValidProducts');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductsControllers.getAllController);
app.get('/products/:id', ProductsControllers.getByIdController);
app.get('/sales', SalesControllers.getAllController);
app.get('/sales/:id', SalesControllers.getByIdController);
app.post('/products',
isValidNameProduct,
isValidQuantityProduct,
ProductsControllers.insertProductController);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
