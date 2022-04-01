const { expect } = require("chai");
const sinon = require("sinon");

const SalesModel = require("../../../models/sales.model");
const SalesServices = require("../../../services/sales.services");

describe("Sales Services", () => {
  describe("Retorna todos os vendas.", async () => {
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

    before(() => sinon.stub(SalesModel, 'getAll').resolves(fakeModel));
    after(() => SalesModel.getAll.restore());

    it('Retorna um objeto.', async () => {
      const getAll = await SalesServices.getAllService();
      expect(getAll).to.be.a('array');
    });

    it('Retorna com as determinadas chaves(saleId, date, productId, quantity).', async () => {
      const getAll = await SalesServices.getAllService();
      expect(getAll[0]).to.have.all.keys(
        "saleId",
        "date",
        "productId",
        "quantity"
      );
    })
  });

  describe('Retorna a venda referente ao ID.', async () => {
    describe('Verifica se o ID não é uma string.', async () => {

      it('Retorna null caso ID não seja string.', async () => {
        const getById = await SalesServices.getByIdService('id');
        expect(getById).to.be.equal(null);
      });
      it('Retorna null caso ID não exista.', async () => {
        const getById = await SalesServices.getByIdService();
        expect(getById).to.be.equal(null);
      });
    });
  
    describe('Caso o retorno seja inválido', async () => {
      before(() => sinon.stub(SalesModel, 'getById').withArgs(1).resolves(null));
      after(() => SalesModel.getById.restore());

      it('Retorna null', async () => {
        const getById = await SalesServices.getByIdService(1);
        expect(getById).to.be.null;
      });
    });

    describe('Retorna o objeto referente ao ID', () => {
      const fakeService = [
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

        before(() => sinon.stub(SalesModel, 'getById').resolves(fakeService));
        after(() => SalesModel.getById.restore());

      it("Retorna um objeto", async () => {
        const getById = await SalesServices.getByIdService(1);
        expect(getById[0]).to.be.a('object');
      });
      it("Retorna com as determinadas chaves(date, productId, quantity).", async () => {
        const getById = await SalesServices.getByIdService(1);
        expect(getById[0]).to.have.all.keys('date', 'productId', 'quantity');
      });
    });
  });
});