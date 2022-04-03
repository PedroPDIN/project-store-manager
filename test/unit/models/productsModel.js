const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../models/connection");
const ProductsModel = require("../../../models/products.model.js");

describe("Product Model", async () => {
  describe("Todos os produtos devem ser retornados", async () => {
    const fakeModel = [
        {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "produto B",
          "quantity": 20
        },
      ];

      before(() => sinon.stub(connection, 'execute'). resolves(fakeModel));
      after(() => connection.execute.restore());

      it("Retorna um objeto.", async () => {
        const getAll = await ProductsModel.getAll();
        expect(getAll).to.be.a('object');
      });

      it("Retorna com as determinadas chaves(id, name, quantity).", async () => {
        const getAll = await ProductsModel.getAll();
        expect(getAll).to.have.all.keys('id', 'name', 'quantity');
      });
  });

  describe('Os produtos devem ser retornados referente ao ID', async () => {

    before(() => sinon.stub(connection, 'execute'). resolves([[]]));
    after(() => connection.execute.restore());

    it('Caso o ID não seja encontrado, retorna null.', async () => {
      const getById = await ProductsModel.getById(0);
      expect(getById).to.be.equal(null);
    })
  })

  describe('Caso o ID seja encontrado.', async () => {
    const fakeModel = [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }
    ];
  
    before(() => sinon.stub(connection, 'execute'). resolves([fakeModel]));
    after(() => connection.execute.restore());

    it('Retorna um objeto.', async () => {
      const getById = await ProductsModel.getById(1);
      expect(getById).to.be.a('object');
    });

    it("Retorna com as determinadas chaves(id, name, quantity).", async () => {
      const getById = await ProductsModel.getById(1);
      expect(getById).to.have.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Inserir um novo produto na tabela product.', async () => {
    const fakeModel = [{
      name: 'new product',
      quantity: 10,
    }];

    before(() => sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]));
    after(() => connection.execute.restore());

    it('Se o retorno é um objeto.', async () => {
      const element = await ProductsModel.insertProduct(fakeModel);
      expect(element).to.be.a('object');
    })

    it('Retorna o id do Product.', async () => {
      const element = await ProductsModel.insertProduct(fakeModel);
      expect(element.id).to.be.equal(1);
    });
  });

  describe('Caso exista o nome de produto retorne "exist".', async () => {
    const fakeModel = [{ result: 'exist' }];

    before(() => sinon.stub(connection, 'execute'). resolves([fakeModel]));
    after(() => connection.execute.restore());

    it('Retorna um objeto.', async () => {
      const element = await ProductsModel.existProduct('nameProduct');
      expect(element).to.be.a('object');
    });

    it('Retorna o valor exist.', async () => {
      const element = await ProductsModel.existProduct('nameProduct');
      expect(element.result).to.be.equal('exist');
    });
  });

  describe('Retorna dados (objeto) que irá atualizar o produto.', async () => {
    const fakeModel = { id: 1, name: 'update product', quantity: 10 };

    before(() => sinon.stub(connection, 'execute'). resolves(fakeModel));
    after(() => connection.execute.restore());

    it('Retorna um objeto.', async () => {
      const data = { name: 'updateProduct', quantity: 10 };
      const updateProduct = await ProductsModel.updateProduct(1, data);
      expect(updateProduct).to.be.a('object');
    });

    it('Possui as determinadas chaves (id, name, quantity)', async () => {
      const data = { name: 'updateProduct', quantity: 10 };
      const updateProduct = await ProductsModel.updateProduct(1, data);
      expect(updateProduct).to.have.all.keys('id', 'name', 'quantity');
    });
  });
});
