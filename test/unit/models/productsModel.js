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
      ]

      before(() => sinon.stub(connection, 'execute'). resolves(fakeModel));
      after(() => connection.execute.restore());

      it("Retorna um objeto.", async () => {
        const getAll = await ProductsModel.getAll();

        expect(getAll).to.be.a('object');
      })

      it("Retorna com as determinadas chaves(id, name, quantity).", async () => {
        const getAll = await ProductsModel.getAll();

        expect(getAll).to.have.all.keys('id', 'name', 'quantity');
      })
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
  
    before(() => sinon.stub(connection, 'execute'). resolves(fakeModel));
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
});
