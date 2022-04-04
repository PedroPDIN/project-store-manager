const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../models/connection");
const SalesModel = require("../../../models/sales.model");

describe("Sales Model.", async () => {
  describe("Todos as vendas devem ser retornados", async () => {
    const fakeModel = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2,
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2,
      },
    ];

    before(() => sinon.stub(connection, "execute").resolves(fakeModel));
    after(() => connection.execute.restore());

    it("Retorna um objeto.", async () => {
      const getAll = await SalesModel.getAll();
      expect(getAll).to.be.a("object");
    });

    it("Retorna com as determinadas chaves(saleId, date, productId, quantity).", async () => {
      const getAll = await SalesModel.getAll();
      expect(getAll).to.have.all.keys(
        "saleId",
        "date",
        "productId",
        "quantity"
      );
    });
  });

  describe('Caso o ID seja encontrado.', async () => {
    const fakeModel = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];
  
    before(() => sinon.stub(connection, 'execute'). resolves(fakeModel));
    after(() => connection.execute.restore());

    it('Retorna um objeto.', async () => {
      const getById = await SalesModel.getById(1);
      expect(getById).to.be.a('object');
    });

    it("Retorna com as determinadas chaves(date, productId, quantity).", async () => {
      const getById = await SalesModel.getById(1);
      expect(getById).to.have.all.keys('date', 'productId', 'quantity');
    });
  });

  describe('Retorna dados (objeto) da nova venda.', async () => {

    const fakeDate = [{ id: 1, date: '2021-09-09T04:54:29.000Z'}];

    before(() => sinon.stub(connection, 'execute'). resolves(fakeDate));
    after(() => connection.execute.restore());

    it('Retorna um objeto', async () => {
      const data = [{ productId: 1, quantity: 3 }];
      const insertSale = await SalesModel.insertSale(data)
      expect(insertSale).to.be.a('object');
    });

    it('Retorna com determinadas chaves(id, itemsSold)', async () => {
      const data = [{ productId: 1, quantity: 3 }];
      const insertSale = await SalesModel.insertSale(data)
      expect(insertSale).to.have.all.keys('id', 'itemsSold');
    });
  });

  describe('Retorna o dado (objeto) que irá atualizar a venda.', async () => {
    const fakeDate = [{ id: 1, date: '2021-09-09T04:54:29.000Z'}];

    before(() => sinon.stub(connection, 'execute'). resolves(fakeDate));
    after(() => connection.execute.restore());

    it('Retorna um objeto', async () => {
      const data = { id: 1, productId: 1, quantity: 3 };
      const updateSale = await SalesModel.updateSale(data);
      expect(updateSale).to.be.a('object');
    });

    it('Retorna com determinadas chaves(saleId, itemUpdated)', async () => {
      const data = { id: 1, productId: 1, quantity: 3 };
      const updateSale = await SalesModel.updateSale(data);
      expect(updateSale).to.have.all.keys('saleId', 'itemUpdated');
    })
  })
});
